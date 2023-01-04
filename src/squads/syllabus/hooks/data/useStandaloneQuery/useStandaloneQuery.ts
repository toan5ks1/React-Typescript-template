import { classService } from "src/squads/syllabus/services/bob/class-service/class-service";
import { quizzesService } from "src/squads/syllabus/services/quizzes-service";

const useStandaloneQuery = () => {
    return {
        quiz: quizzesService.query,
        classService: classService.query,
    };
};

export default useStandaloneQuery;
