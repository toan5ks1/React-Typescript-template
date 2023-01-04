import { danger, warn, fail, markdown, schedule } from "danger";
import todos from "danger-plugin-todos";

const jiraIssue = require("danger-plugin-jira-issue").default;

/**
 * Check if file changed but dont have any tests (OK if you are refactor)
 * @return {void}
 */
function filesChangedButNotHavingTests() {
    const fileChanges = [...danger.git.modified_files, ...danger.git.created_files];
    const hasAppChanges = fileChanges.length > 0;

    const testChanges = fileChanges.filter((filepath) => filepath.includes("test"));
    const hasTestChanges = testChanges.length > 0;

    // Warn if there are library changes, but not tests
    if (hasAppChanges && !hasTestChanges) {
        warn(
            "There are library changes, but not tests. That's OK as long as you're refactoring existing code"
        );
    }
}

// can only run in github action
function checkBigPr() {
    const bigPRThreshold = 700;
    if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
        warn(":exclamation: Big PR");
        markdown(
            "Pull Request size seems relatively large. If Pull Request contains multiple changes, split each into separate PR will helps faster, easier review."
        );
    }
}

function checkCommitMsg() {
    danger.git.commits.forEach((commit) => {
        const isMergeBranchCommit = commit.message.startsWith("Merge branch");
        const isCrowdinTranslation =
            commit.message.includes("New Crowdin translations") ||
            commit.message.match(new RegExp("[Crowdin]", "gi"));

        const isExportMetadataCommit = commit.message.includes("Export metadata");

        const isMergePRCommit = commit.message.startsWith("Merge pull request");

        const isMatchConventional = commit.message.match(
            /^(feature:)|(fix:)|(test:)|(clean:)|(refactor:)|(codestyle:)|(build:)|(other:)|(chore:)/g
        );
        const isMatchJiraTicketFormat = commit.message.match(new RegExp("(LT-[0-9]+)", "gi"));

        if (
            isMergeBranchCommit ||
            isMergePRCommit ||
            isCrowdinTranslation ||
            isExportMetadataCommit
        ) {
            return;
        }

        let msg = "";
        let shouldBeError = false;
        if (!isMatchConventional) {
            msg += `Commit message doesnt match conventional.  `;
        }

        if (!isMatchJiraTicketFormat) {
            shouldBeError = true;
            msg += `Commit message '${commit.message}' does match the jira format. Example: [LT-XXXX] feature: hello world`;
        }

        if (!msg) {
            return;
        }

        if (shouldBeError) {
            fail(msg);
        } else {
            warn(msg);
        }
    });
}

function linkJiraIssue() {
    jiraIssue({
        key: ["ERP", "MO", "LT"],
        url: "https://manabie.atlassian.net/browse",
        emoji: ":paperclip:",
        location: "branch", // Optional location, either 'title' or 'branch'
    });
}

async function run() {
    checkBigPr();
    checkCommitMsg();
    linkJiraIssue();
    filesChangedButNotHavingTests();
}

schedule(
    todos({
        keywords: ["TODO", "FIXME"],
    })
);

run().catch((error) => {
    console.error(error);
    process.exit(1);
});
