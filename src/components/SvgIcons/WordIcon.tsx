import { HTMLAttributes } from "react";

const WordIcon = (props: HTMLAttributes<SVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={22}
            xmlSpace="preserve"
            {...props}
        >
            <image
                width={18}
                height={22}
                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAWCAMAAAD6gTxzAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAXVBMVEUAAAAAedQAeNUAeM8A eNMAd9QAeNT///8QgNePxOwgidnP5fe/3fWv1fHf7vrv9/2v1fJQouK/3fRAmt+fzO+Au+mQw+wQ gNbv9/xgquSgzO8wkdxws+efze9gq+QTGUl+AAAABnRSTlMAj98gkJCaJNajAAAAAWJLR0QHFmGI 6wAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+YEEw87NK2/UD4AAAB+SURBVBjTjc7hDoIw DATgCXqtODfZnIgI7/+YOAVWZiRecn++tE3VDilFqWKALwNoymJreltG0RLxZIKO1ccEzeu/6KSJ zobsJVFdkYOnK/RCAebW8L3lNOXw8IF1V4vz/GTtA3pBLZhCAyPIYXi1W/1lY+32q/9QHrXP5TAC +hoLq9/8QEMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDQtMTlUMTI6NTk6NTIrMDM6MDAsogQb AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA0LTE5VDEyOjU5OjUyKzAzOjAwXf+8pwAAAABJRU5E rkJggg=="
            />
        </svg>
    );
};

export default WordIcon;
