import { inferQuery } from "src/squads/syllabus/services/infer-query";

export interface UseGetFlashcardParams {
    loId: string;
}

const useGetFlashcard = ({ loId }: UseGetFlashcardParams) => {
    const { isLoading, data, isFetching, refetch } = inferQuery({
        entity: "quizzes",
        action: "syllabusQuizGetManyByLOId",
    })(
        {
            lo_id: loId,
        },
        {
            enabled: true,
        }
    );

    return { isLoading, data, refetch, isFetching };
};

export default useGetFlashcard;
