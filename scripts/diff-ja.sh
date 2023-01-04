#!/bin/bash


if [[ "$release_branch" == "" ]] 
then
    release_branch="origin/$(git branch --all --list '*origin/release/20*' | sort -r | head -n 1 | cut -c18-)"
else 
    release_branch="origin/$release_branch"
fi

source_branch="$(git branch --show-current)"

ja_path="./src/i18n/source/cms_ja.json"

diff_ja=$(git diff $release_branch $source_branch -- $ja_path)

if [[ "$diff_ja" != "" ]] 
then
    echo "Something change in ja file"
else 
    echo "Nothing change in ja file"
fi
