import { useCallback, useMemo } from "react";

import clsx from "clsx";
import { ERPModules } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { formatDate } from "src/common/utils/time";
import {
    NormalizeStudentInformation,
    LocationInformationHasura,
} from "src/squads/user/common/types";
import { phoneNumberFormat } from "src/squads/user/common/utils/display";
import { GroupsBoxStudentInfo } from "src/squads/user/modules/student-detail/types";

import { Box, Grid } from "@mui/material";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";
import TypographyWithValue from "src/components/Typographys/TypographyWithValue";

import { StudentEnrollmentStatus } from "manabuf/usermgmt/v2/enums_pb";

import useGetStudentGradeNameByCountry from "src/squads/user/hooks/useGetStudentGradeNameByCountry";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";
import useStudentDetailClasses from "src/squads/user/modules/student-detail/hooks/useStudentDetailClasses";

export interface GeneralInfoDetailProps {
    student?: NormalizeStudentInformation;
}

const GeneralInfoDetail = ({ student }: GeneralInfoDetailProps) => {
    const tStudents = useResourceTranslate(ERPModules.STUDENTS);
    const { classes } = useStudentDetailClasses();
    const { getStudentGradeName } = useGetStudentGradeNameByCountry();
    const isShowNamePhonetic = useUserFeatureToggle("STUDENT_MANAGEMENT_STUDENT_PHONETIC_NAME");
    const isShowContactDetail = useUserFeatureToggle(
        "STUDENT_MANAGEMENT_STUDENT_CONTACT_PHONE_NUMBER"
    );

    const renderStatus = useCallback(
        (enrollmentStatus?: NormalizeStudentInformation["enrollment_status"]) => {
            if (!enrollmentStatus) return "";

            return tStudents(
                `choices.studentsEnrollmentStatus.${
                    StudentEnrollmentStatus[convertString(enrollmentStatus)]
                }`
            );
        },
        [tStudents]
    );

    const renderPhoneNumber = useCallback((user?: NormalizeStudentInformation["user"]) => {
        if (!user?.phone_number) return "";

        return phoneNumberFormat(user.country, user.phone_number);
    }, []);

    const renderGender = (user?: NormalizeStudentInformation["user"]) => {
        if (!user?.gender || user?.gender === "NONE") return "";

        return tStudents(`labels.${user?.gender.toLowerCase()}`);
    };

    const renderBirthday = (user?: NormalizeStudentInformation["user"]) => {
        if (!user?.birthday) return "";

        return formatDate(user?.birthday, "yyyy/LL/dd");
    };

    const renderLocation = (user?: NormalizeStudentInformation["user"]) => {
        if (!user?.locations || user?.locations.length === 0) return "";
        const locationNames = user?.locations
            .map((location: LocationInformationHasura) => location.name)
            .join(", ");

        return locationNames;
    };

    const groupsBoxStudentInfo = useMemo<GroupsBoxStudentInfo[]>(
        () => [
            ...(isShowNamePhonetic
                ? [
                      {
                          childElements: [
                              {
                                  value: convertString(student?.user?.name),
                                  label: tStudents(`labels.detailName`),
                                  dataTestidValue: "TabStudentDetail__generalNameValue",
                                  classNameLabel: classes.labelOneColumn,
                                  classNameValue: classes.valueOneColumn,
                              },
                          ],
                      },
                      {
                          childElements: [
                              {
                                  value: convertString(student?.user?.full_name_phonetic),
                                  label: tStudents(`labels.phoneticName`),
                                  dataTestidValue: "TabStudentDetail__generalPhoneticNameValue",
                                  classNameLabel: classes.labelOneColumn,
                                  classNameValue: classes.valueOneColumn,
                              },
                          ],
                      },
                      {
                          childElements: isShowContactDetail
                              ? [
                                    {
                                        value: convertString(student?.user?.email),
                                        label: tStudents(`labels.email`),
                                        dataTestidValue: "TabStudentDetail__generalEmailValue",
                                        classNameLabel: classes.labelOneColumn,
                                        classNameValue: classes.valueOneColumn,
                                    },
                                ]
                              : [
                                    {
                                        value: convertString(student?.user?.email),
                                        label: tStudents(`labels.email`),
                                        dataTestidValue: "TabStudentDetail__generalEmailValue",
                                    },
                                    {
                                        value: renderPhoneNumber(student?.user),
                                        label: tStudents(`labels.phoneNumber`),
                                        dataTestidValue:
                                            "TabStudentDetail__generalPhoneNumberValue",
                                    },
                                ],
                      },
                      {
                          childElements: [
                              {
                                  value: getStudentGradeName(student?.current_grade),
                                  label: tStudents(`labels.grade`),
                                  dataTestidValue: "TabStudentDetail__generalGradeValue",
                              },
                              {
                                  value: renderStatus(student?.enrollment_status),
                                  label: tStudents(`enrollmentStatus`),
                                  dataTestidValue: "TabStudentDetail__generalEnrollmentStatusValue",
                              },
                          ],
                      },
                      {
                          childElements: [
                              {
                                  value: renderBirthday(student?.user),
                                  label: tStudents(`labels.birthday`),
                                  dataTestidValue: "TabStudentDetail__generalBirthdayValue",
                              },
                              {
                                  value: renderGender(student?.user),
                                  label: tStudents(`labels.gender`),
                                  dataTestidValue: "TabStudentDetail__generalGenderValue",
                              },
                          ],
                      },
                      {
                          childElements: [
                              {
                                  value: convertString(student?.student_external_id),
                                  label: tStudents(`labels.externalStudentID`),
                                  dataTestidValue:
                                      "TabStudentDetail__generalExternalStudentIDValue",
                              },
                              {
                                  value: renderLocation(student?.user),
                                  label: tStudents(`labels.location`),
                                  dataTestidValue: "TabStudentDetail__generalLocationValue",
                              },
                          ],
                      },
                  ]
                : [
                      {
                          childElements: [
                              {
                                  value: convertString(student?.user?.name),
                                  label: tStudents(`labels.detailName`),
                                  dataTestidValue: "TabStudentDetail__generalNameValue",
                              },

                              {
                                  value: renderStatus(student?.enrollment_status),
                                  label: tStudents(`enrollmentStatus`),
                                  dataTestidValue: "TabStudentDetail__generalEnrollmentStatusValue",
                              },
                          ],
                      },
                      {
                          childElements: [
                              {
                                  value: convertString(student?.user?.email),
                                  label: tStudents(`labels.email`),
                                  dataTestidValue: "TabStudentDetail__generalEmailValue",
                              },
                              {
                                  value: getStudentGradeName(student?.current_grade),
                                  label: tStudents(`labels.grade`),
                                  dataTestidValue: "TabStudentDetail__generalGradeValue",
                              },
                          ],
                      },
                      {
                          childElements: isShowContactDetail
                              ? [
                                    {
                                        value: convertString(student?.student_external_id),
                                        label: tStudents(`labels.externalStudentID`),
                                        dataTestidValue:
                                            "TabStudentDetail__generalExternalStudentIDValue",
                                        classNameLabel: classes.labelOneColumn,
                                        classNameValue: classes.valueOneColumn,
                                    },
                                ]
                              : [
                                    {
                                        value: renderPhoneNumber(student?.user),
                                        label: tStudents(`labels.phoneNumber`),
                                        dataTestidValue:
                                            "TabStudentDetail__generalPhoneNumberValue",
                                    },

                                    {
                                        value: convertString(student?.student_external_id),
                                        label: tStudents(`labels.externalStudentID`),
                                        dataTestidValue:
                                            "TabStudentDetail__generalExternalStudentIDValue",
                                    },
                                ],
                      },
                      {
                          childElements: [
                              {
                                  value: renderBirthday(student?.user),
                                  label: tStudents(`labels.birthday`),
                                  dataTestidValue: "TabStudentDetail__generalBirthdayValue",
                              },
                              {
                                  value: renderGender(student?.user),
                                  label: tStudents(`labels.gender`),
                                  dataTestidValue: "TabStudentDetail__generalGenderValue",
                              },
                          ],
                      },
                      {
                          childElements: [
                              {
                                  value: convertString(student?.student_id),
                                  label: tStudents(`labels.studentID`),
                                  classNameLabel: classes.labelOneColumn,
                                  dataTestidValue: "TabStudentDetail__generalStudentIDValue",
                              },
                          ],
                      },
                      {
                          childElements: [
                              {
                                  value: renderLocation(student?.user),
                                  label: tStudents(`labels.location`),
                                  dataTestidValue: "TabStudentDetail__generalLocationValue",
                                  classNameLabel: classes.labelOneColumn,
                                  classNameValue: classes.valueOneColumn,
                              },
                          ],
                      },
                  ]),
            {
                childElements: [
                    {
                        value: convertString(student?.student_note),
                        label: tStudents(`labels.note`),
                        classNameLabel: classes.labelOneColumn,
                        classNameValue: clsx(classes.valueOneColumn, classes.breakWord),
                        dataTestidValue: "TabStudentDetail__generalNoteValue",
                    },
                ],
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [JSON.stringify(student), getStudentGradeName, renderPhoneNumber, renderStatus]
    );
    return (
        <Box data-testid="TabStudentDetail__generalInfo">
            <Box mb={1}>
                <TypographyPrimary data-testid="TabStudentDetail__subTitle">
                    {tStudents("titles.generalInfo")}
                </TypographyPrimary>
            </Box>
            {groupsBoxStudentInfo.map((group, index) => {
                return (
                    <Box key={index} display="flex" flexDirection="row" py={0.75}>
                        {group.childElements.map(({ value, label, ...rest }, indexChild) => (
                            <Grid
                                key={indexChild}
                                container
                                data-testid="TabStudentDetail__generalInfoItem"
                            >
                                <TypographyWithValue
                                    variant="horizontal"
                                    value={value}
                                    label={label}
                                    xsLabel={3}
                                    xsValue={8}
                                    {...rest}
                                />
                            </Grid>
                        ))}
                    </Box>
                );
            })}
        </Box>
    );
};

export default GeneralInfoDetail;
