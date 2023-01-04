var se=Object.defineProperty,re=Object.defineProperties;var oe=Object.getOwnPropertyDescriptors;var I=Object.getOwnPropertySymbols;var m=Object.prototype.hasOwnProperty,z=Object.prototype.propertyIsEnumerable;var P=(i,t,o)=>t in i?se(i,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):i[t]=o,D=(i,t)=>{for(var o in t||(t={}))m.call(t,o)&&P(i,o,t[o]);if(I)for(var o of I(t))z.call(t,o)&&P(i,o,t[o]);return i},M=(i,t)=>re(i,oe(t));var F=(i,t)=>{var o={};for(var u in i)m.call(i,u)&&t.indexOf(u)<0&&(o[u]=i[u]);if(i!=null&&I)for(var u of I(i))t.indexOf(u)<0&&z.call(i,u)&&(o[u]=i[u]);return o};import{d as B,I as S,a as g,b as _,c as L,s as N,e as ie,l as ne,f as ue,g as ae,h as de,i as pe,q as le,j as ce,k as ye,m as ve,n as ge,o as Ce,t as Re,p as Be}from"./useShowSnackbar.da46e481.js";import{dI as h,aZ as C,aY as y,cZ as E,ho as $,fa as Se,f9 as Le,a$ as w,b0 as T,hI as fe,hJ as j,dJ as ke,dN as _e,hx as x,dP as Ie,f2 as he,dL as be,cV as R}from"./index.7daee9ef.js";h`
    query Lesson_ClassListByCourseID($course_id: String!, $limit: Int = 5, $offset: Int = 0) {
        class(
            where: { course: { course_id: { _eq: $course_id } } }
            limit: $limit
            offset: $offset
        ) {
            class_id
            name
            location {
                location_id
                name
            }
        }
        class_aggregate(where: { course: { course_id: { _eq: $course_id } } }) {
            aggregate {
                count
            }
        }
    }
`;h`
    query Lesson_ClassListByCourseIdV2($course_id: String!, $limit: Int = 5, $offset: Int = 0) {
        class(where: { course_id: { _eq: $course_id } }, limit: $limit, offset: $offset) {
            class_id
            name
            location {
                location_id
                name
            }
        }
        class_aggregate(where: { course_id: { _eq: $course_id } }) {
            aggregate {
                count
            }
        }
    }
`;const De=h`
    query Lesson_ClassListByCourseIdV3(
        $course_id: String!
        $limit: Int = 5
        $offset: Int = 0
        $order_by: [class_order_by!] = { name: asc }
    ) {
        class(
            where: { course_id: { _eq: $course_id } }
            limit: $limit
            offset: $offset
            order_by: $order_by
        ) {
            class_id
            name
            location {
                location_id
                name
            }
        }
        class_aggregate(where: { course_id: { _eq: $course_id } }) {
            aggregate {
                count
            }
        }
    }
`,Me=h`
    query Lesson_ClassAssociationByClassId($class_id: String!) {
        class_member_aggregate(where: { class_id: { _eq: $class_id } }, limit: 1) {
            aggregate {
                count
            }
        }
        lessons_aggregate(where: { class_id: { _eq: $class_id } }, limit: 1) {
            aggregate {
                count
            }
        }
    }
`;class Fe extends S{async getListByCourseId(t){var u,a,p,l;const o=await this._call({query:De,variables:t});return{data:(u=o.data)==null?void 0:u.class,total:(l=(p=(a=o.data)==null?void 0:a.class_aggregate.aggregate)==null?void 0:p.count)!=null?l:0}}async getClassAssociationByCourseId(t){return(await this._call({query:Me,variables:t})).data}}const W=new Fe(C,"bobGraphQL",B),we=g({query:{classGetListByCourseId:i=>{if(!i.course_id)throw new _({action:"classGetListByCourseId",serviceName:"bobGraphQL",errors:[{field:"course_id"}]});return W.getListByCourseId(i)},classGetClassAssociationByCourseId:i=>{if(!i.class_id)throw new _({action:"classGetClassAssociationByCourseId",serviceName:"bobGraphQL",errors:[{field:"class_id"}]});return W.getClassAssociationByCourseId(i)}}}),A=y`
    fragment CourseAttrs on courses {
        course_id
        name
        icon
        grade
        subject
        country
        school_id
        display_order
    }
`,Te=y`
    fragment Lesson_CoursesAttrs on courses {
        course_id
        name
        icon
        grade
        subject
        country
        school_id
        display_order
        teaching_method
    }
`,qe=y`
    fragment Lesson_CourseAttrs on courses {
        course_id
        name
        icon
        grade
        subject
        country
        school_id
        display_order
        teaching_method
    }
`,Oe=y`
    query CoursesOne($course_id: String!) {
        courses(where: { course_id: { _eq: $course_id } }) {
            ...CourseAttrs
            course_books {
                book_id
                books {
                    book_chapters {
                        chapter_id
                    }
                }
            }
        }
    }
    ${A}
`,Pe=y`
    query Lesson_CoursesOne($course_id: String!) {
        courses(where: { course_id: { _eq: $course_id } }) {
            ...Lesson_CourseAttrs
            course_books {
                book_id
                books {
                    book_chapters {
                        chapter_id
                    }
                }
            }
        }
    }
    ${qe}
`,me=y`
    query CoursesList(
        $name: String
        $course_id: [String!]
        $course_type: String
        $limit: Int = 10
        $offset: Int = 0
    ) {
        courses(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc, display_order: asc, name: asc, course_id: asc }
            where: {
                name: { _ilike: $name }
                course_id: { _in: $course_id }
                course_type: { _eq: $course_type }
            }
        ) {
            ...CourseAttrs
        }
        courses_aggregate(
            where: {
                name: { _ilike: $name }
                course_id: { _in: $course_id }
                course_type: { _eq: $course_type }
            }
        ) {
            aggregate {
                count
            }
        }
    }
    ${A}
`,ze=y`
    query CourseTitle($course_id: String!) {
        courses(where: { course_id: { _eq: $course_id } }) {
            name
        }
    }
`,Ee=y`
    query Lesson_CoursesList(
        $name: String
        $course_id: [String!]
        $course_type: String
        $limit: Int = 10
        $offset: Int = 0
    ) {
        courses(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc, display_order: asc, name: asc, course_id: asc }
            where: {
                name: { _ilike: $name }
                course_id: { _in: $course_id }
                course_type: { _eq: $course_type }
            }
        ) {
            ...Lesson_CoursesAttrs
        }
        courses_aggregate(
            where: {
                name: { _ilike: $name }
                course_id: { _in: $course_id }
                course_type: { _eq: $course_type }
            }
        ) {
            aggregate {
                count
            }
        }
    }
    ${Te}
`;class $e extends S{async getOne(t){var a;const o={query:Oe,variables:t},u=await this._call(o);return E((a=u.data)==null?void 0:a.courses)[0]}async getOneV2(t){var a;const o={query:Pe,variables:t},u=await this._call(o);return E((a=u.data)==null?void 0:a.courses)[0]}async getList(u){var a=u,{name:t}=a,o=F(a,["name"]);var v,e,s,r;const p={query:me,variables:M(D({},o),{name:$(t)})},l=await this._call(p);return{data:(v=l.data)==null?void 0:v.courses,total:(r=(s=(e=l.data)==null?void 0:e.courses_aggregate.aggregate)==null?void 0:s.count)!=null?r:0}}async getTitle(t){var a;const o={query:ze,variables:t};return(a=(await this._call(o)).data)==null?void 0:a.courses[0]}async getListV2(u){var a=u,{name:t}=a,o=F(a,["name"]);var v,e,s,r;const p={query:Ee,variables:M(D({},o),{name:$(t)})},l=await this._call(p);return{data:(v=l.data)==null?void 0:v.courses,total:(r=(s=(e=l.data)==null?void 0:e.courses_aggregate.aggregate)==null?void 0:s.count)!=null?r:0}}}const k=new $e(C,"bobGraphQL",B),je=g({query:{courseGetOne:i=>{if(!i.course_id)throw new _({action:"courseGetOne",errors:[{field:"course_id"}],serviceName:"bobGraphQL"});return k.getOne(i)},courseGetList:i=>k.getList(i),syllabusCourseGetTitle:i=>i.course_id?k.getTitle(i):L(void 0),lessonCourseGetListV2:i=>k.getListV2(i),lessonCourseGetOne:i=>{if(!i.course_id)throw new _({action:"lessonCourseGetOne",errors:[{field:"course_id"}],serviceName:"bobGraphQL"});return k.getOneV2(i)}}}),We=y`
    query LessonsByCourseId($course_id: String!) {
        lessons(where: { course_id: { _eq: $course_id }, deleted_at: { _is_null: true } }) {
            name
            lesson_group_id
        }
    }
`;class Ve extends S{async getMany(t){var a;const o={query:We,variables:t};return(a=(await this._call(o)).data)==null?void 0:a.lessons}}const Ge=new Ve(C,"bobGraphQL",B),Ne=g({query:{lessonSyllabusGetMany:i=>{const{course_id:t}=i;if(!t)throw new _({action:"lessonSyllabusGetMany",errors:[{field:"course_id"}],serviceName:"bobGraphQL"});return Ge.getMany({course_id:t})}}}),xe=()=>new Se.RetrieveLocationsRequest;class Ae extends T{async retrieveLocations(){const t=xe(),o=await this._call("retrieveLocations",t);return o?o.toObject().locationsList:[]}}const Qe=new Ae(Le.MasterDataReaderServicePromiseClient,C,w),Ue=g({query:{masterReaderGetLocation:()=>Qe.retrieveLocations()}}),Je=y`
    query LocationListByIds($location_ids: [String!] = []) {
        locations(where: { location_id: { _in: $location_ids } }) {
            name
            location_id
        }
    }
`,Ye=y`
    query Lesson_LocationIdsByCourseIdV2($course: String = "") {
        get_locations_active_by_course_id(args: { course: $course }) {
            location_id
        }
    }
`;class He extends S{async getManyQuery(t){var u;return(u=(await this._call({query:Je,variables:t})).data)==null?void 0:u.locations}async getLocationIdsByCourseId(t){var u;return(u=(await this._call({query:Ye,variables:t})).data)==null?void 0:u.get_locations_active_by_course_id}}const V=new He(C,"bobGraphQL",B),Ze=g({query:{lessonLocationGetMany:i=>V.getManyQuery(i),lessonLocationIdsByCourseId:i=>V.getLocationIdsByCourseId(i)}});class Ke extends T{async retrieveBrightcoveProfileData(){const t=new j.RetrieveBrightCoveProfileDataRequest;return(await this._call("retrieveBrightCoveProfileData",t)).toObject()}async retrieveBrightcoveVideoInfo({videoId:t,accountId:o}){const u=new j.GetBrightCoveVideoInfoRequest;return u.setAccountId(o),u.setVideoId(t),(await this._call("getBrightcoveVideoInfo",u)).toObject()}}const G=new Ke(fe.BrightcoveServicePromiseClient,C,w),Xe=g({query:{BRIGHTCOVE_GET_PROFILE:()=>G.retrieveBrightcoveProfileData(),syllabusBrightcoveGetVideoInfo:i=>{const{accountId:t,videoId:o}=i;return t&&o?G.retrieveBrightcoveVideoInfo(i):L(void 0)}}});var q={};(function(i){var t=ke,o=t,u=Function("return this")(),a=_e;o.object.extend(proto,a);var p=x;o.object.extend(proto,p);var l=Ie;o.object.extend(proto,l);var v=he;o.object.extend(proto,v),o.exportSymbol("proto.eureka.v1.ListClassByCourseRequest",null,u),o.exportSymbol("proto.eureka.v1.ListClassByCourseResponse",null,u),o.exportSymbol("proto.eureka.v1.ListCourseIDsByStudentsRequest",null,u),o.exportSymbol("proto.eureka.v1.ListCourseIDsByStudentsResponse",null,u),o.exportSymbol("proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses",null,u),o.exportSymbol("proto.eureka.v1.ListStudentByCourseRequest",null,u),o.exportSymbol("proto.eureka.v1.ListStudentByCourseResponse",null,u),o.exportSymbol("proto.eureka.v1.ListStudentIDsByCourseRequest",null,u),o.exportSymbol("proto.eureka.v1.ListStudentIDsByCourseResponse",null,u),o.exportSymbol("proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses",null,u),o.exportSymbol("proto.eureka.v1.ListStudentIDsByCourseV2Request",null,u),o.exportSymbol("proto.eureka.v1.ListStudentIDsByCourseV2Response",null,u),o.exportSymbol("proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses",null,u),o.exportSymbol("proto.eureka.v1.ListTopicsByStudyPlanRequest",null,u),o.exportSymbol("proto.eureka.v1.ListTopicsByStudyPlanResponse",null,u),o.exportSymbol("proto.eureka.v1.RetrieveLOsRequest",null,u),o.exportSymbol("proto.eureka.v1.RetrieveLOsResponse",null,u),proto.eureka.v1.RetrieveLOsRequest=function(e){t.Message.initialize(this,e,0,-1,proto.eureka.v1.RetrieveLOsRequest.repeatedFields_,null)},o.inherits(proto.eureka.v1.RetrieveLOsRequest,t.Message),o.DEBUG&&!COMPILED&&(proto.eureka.v1.RetrieveLOsRequest.displayName="proto.eureka.v1.RetrieveLOsRequest"),proto.eureka.v1.RetrieveLOsResponse=function(e){t.Message.initialize(this,e,0,-1,proto.eureka.v1.RetrieveLOsResponse.repeatedFields_,null)},o.inherits(proto.eureka.v1.RetrieveLOsResponse,t.Message),o.DEBUG&&!COMPILED&&(proto.eureka.v1.RetrieveLOsResponse.displayName="proto.eureka.v1.RetrieveLOsResponse"),proto.eureka.v1.ListClassByCourseRequest=function(e){t.Message.initialize(this,e,0,-1,null,null)},o.inherits(proto.eureka.v1.ListClassByCourseRequest,t.Message),o.DEBUG&&!COMPILED&&(proto.eureka.v1.ListClassByCourseRequest.displayName="proto.eureka.v1.ListClassByCourseRequest"),proto.eureka.v1.ListClassByCourseResponse=function(e){t.Message.initialize(this,e,0,-1,proto.eureka.v1.ListClassByCourseResponse.repeatedFields_,null)},o.inherits(proto.eureka.v1.ListClassByCourseResponse,t.Message),o.DEBUG&&!COMPILED&&(proto.eureka.v1.ListClassByCourseResponse.displayName="proto.eureka.v1.ListClassByCourseResponse"),proto.eureka.v1.ListStudentByCourseRequest=function(e){t.Message.initialize(this,e,0,-1,null,null)},o.inherits(proto.eureka.v1.ListStudentByCourseRequest,t.Message),o.DEBUG&&!COMPILED&&(proto.eureka.v1.ListStudentByCourseRequest.displayName="proto.eureka.v1.ListStudentByCourseRequest"),proto.eureka.v1.ListStudentByCourseResponse=function(e){t.Message.initialize(this,e,0,-1,proto.eureka.v1.ListStudentByCourseResponse.repeatedFields_,null)},o.inherits(proto.eureka.v1.ListStudentByCourseResponse,t.Message),o.DEBUG&&!COMPILED&&(proto.eureka.v1.ListStudentByCourseResponse.displayName="proto.eureka.v1.ListStudentByCourseResponse"),proto.eureka.v1.ListStudentIDsByCourseRequest=function(e){t.Message.initialize(this,e,0,-1,proto.eureka.v1.ListStudentIDsByCourseRequest.repeatedFields_,null)},o.inherits(proto.eureka.v1.ListStudentIDsByCourseRequest,t.Message),o.DEBUG&&!COMPILED&&(proto.eureka.v1.ListStudentIDsByCourseRequest.displayName="proto.eureka.v1.ListStudentIDsByCourseRequest"),proto.eureka.v1.ListStudentIDsByCourseResponse=function(e){t.Message.initialize(this,e,0,-1,proto.eureka.v1.ListStudentIDsByCourseResponse.repeatedFields_,null)},o.inherits(proto.eureka.v1.ListStudentIDsByCourseResponse,t.Message),o.DEBUG&&!COMPILED&&(proto.eureka.v1.ListStudentIDsByCourseResponse.displayName="proto.eureka.v1.ListStudentIDsByCourseResponse"),proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses=function(e){t.Message.initialize(this,e,0,-1,proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses.repeatedFields_,null)},o.inherits(proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses,t.Message),o.DEBUG&&!COMPILED&&(proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses.displayName="proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses"),proto.eureka.v1.ListCourseIDsByStudentsRequest=function(e){t.Message.initialize(this,e,0,-1,proto.eureka.v1.ListCourseIDsByStudentsRequest.repeatedFields_,null)},o.inherits(proto.eureka.v1.ListCourseIDsByStudentsRequest,t.Message),o.DEBUG&&!COMPILED&&(proto.eureka.v1.ListCourseIDsByStudentsRequest.displayName="proto.eureka.v1.ListCourseIDsByStudentsRequest"),proto.eureka.v1.ListCourseIDsByStudentsResponse=function(e){t.Message.initialize(this,e,0,-1,proto.eureka.v1.ListCourseIDsByStudentsResponse.repeatedFields_,null)},o.inherits(proto.eureka.v1.ListCourseIDsByStudentsResponse,t.Message),o.DEBUG&&!COMPILED&&(proto.eureka.v1.ListCourseIDsByStudentsResponse.displayName="proto.eureka.v1.ListCourseIDsByStudentsResponse"),proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses=function(e){t.Message.initialize(this,e,0,-1,proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses.repeatedFields_,null)},o.inherits(proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses,t.Message),o.DEBUG&&!COMPILED&&(proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses.displayName="proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses"),proto.eureka.v1.ListStudentIDsByCourseV2Request=function(e){t.Message.initialize(this,e,0,-1,proto.eureka.v1.ListStudentIDsByCourseV2Request.repeatedFields_,null)},o.inherits(proto.eureka.v1.ListStudentIDsByCourseV2Request,t.Message),o.DEBUG&&!COMPILED&&(proto.eureka.v1.ListStudentIDsByCourseV2Request.displayName="proto.eureka.v1.ListStudentIDsByCourseV2Request"),proto.eureka.v1.ListStudentIDsByCourseV2Response=function(e){t.Message.initialize(this,e,0,-1,null,null)},o.inherits(proto.eureka.v1.ListStudentIDsByCourseV2Response,t.Message),o.DEBUG&&!COMPILED&&(proto.eureka.v1.ListStudentIDsByCourseV2Response.displayName="proto.eureka.v1.ListStudentIDsByCourseV2Response"),proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses=function(e){t.Message.initialize(this,e,0,-1,proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses.repeatedFields_,null)},o.inherits(proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses,t.Message),o.DEBUG&&!COMPILED&&(proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses.displayName="proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses"),proto.eureka.v1.ListTopicsByStudyPlanRequest=function(e){t.Message.initialize(this,e,0,-1,null,null)},o.inherits(proto.eureka.v1.ListTopicsByStudyPlanRequest,t.Message),o.DEBUG&&!COMPILED&&(proto.eureka.v1.ListTopicsByStudyPlanRequest.displayName="proto.eureka.v1.ListTopicsByStudyPlanRequest"),proto.eureka.v1.ListTopicsByStudyPlanResponse=function(e){t.Message.initialize(this,e,0,-1,proto.eureka.v1.ListTopicsByStudyPlanResponse.repeatedFields_,null)},o.inherits(proto.eureka.v1.ListTopicsByStudyPlanResponse,t.Message),o.DEBUG&&!COMPILED&&(proto.eureka.v1.ListTopicsByStudyPlanResponse.displayName="proto.eureka.v1.ListTopicsByStudyPlanResponse"),proto.eureka.v1.RetrieveLOsRequest.repeatedFields_=[2,4],t.Message.GENERATE_TO_OBJECT&&(proto.eureka.v1.RetrieveLOsRequest.prototype.toObject=function(e){return proto.eureka.v1.RetrieveLOsRequest.toObject(e,this)},proto.eureka.v1.RetrieveLOsRequest.toObject=function(e,s){var r,n={studentId:t.Message.getFieldWithDefault(s,1,""),topicIdsList:(r=t.Message.getRepeatedField(s,2))==null?void 0:r,withCompleteness:t.Message.getBooleanFieldWithDefault(s,3,!1),loIdsList:(r=t.Message.getRepeatedField(s,4))==null?void 0:r,withAchievementCrown:t.Message.getBooleanFieldWithDefault(s,5,!1)};return e&&(n.$jspbMessageInstance=s),n}),proto.eureka.v1.RetrieveLOsRequest.deserializeBinary=function(e){var s=new t.BinaryReader(e),r=new proto.eureka.v1.RetrieveLOsRequest;return proto.eureka.v1.RetrieveLOsRequest.deserializeBinaryFromReader(r,s)},proto.eureka.v1.RetrieveLOsRequest.deserializeBinaryFromReader=function(e,s){for(;s.nextField()&&!s.isEndGroup();){var r=s.getFieldNumber();switch(r){case 1:var n=s.readString();e.setStudentId(n);break;case 2:var n=s.readString();e.addTopicIds(n);break;case 3:var n=s.readBool();e.setWithCompleteness(n);break;case 4:var n=s.readString();e.addLoIds(n);break;case 5:var n=s.readBool();e.setWithAchievementCrown(n);break;default:s.skipField();break}}return e},proto.eureka.v1.RetrieveLOsRequest.prototype.serializeBinary=function(){var e=new t.BinaryWriter;return proto.eureka.v1.RetrieveLOsRequest.serializeBinaryToWriter(this,e),e.getResultBuffer()},proto.eureka.v1.RetrieveLOsRequest.serializeBinaryToWriter=function(e,s){var r=void 0;r=e.getStudentId(),r.length>0&&s.writeString(1,r),r=e.getTopicIdsList(),r.length>0&&s.writeRepeatedString(2,r),r=e.getWithCompleteness(),r&&s.writeBool(3,r),r=e.getLoIdsList(),r.length>0&&s.writeRepeatedString(4,r),r=e.getWithAchievementCrown(),r&&s.writeBool(5,r)},proto.eureka.v1.RetrieveLOsRequest.prototype.getStudentId=function(){return t.Message.getFieldWithDefault(this,1,"")},proto.eureka.v1.RetrieveLOsRequest.prototype.setStudentId=function(e){return t.Message.setProto3StringField(this,1,e)},proto.eureka.v1.RetrieveLOsRequest.prototype.getTopicIdsList=function(){return t.Message.getRepeatedField(this,2)},proto.eureka.v1.RetrieveLOsRequest.prototype.setTopicIdsList=function(e){return t.Message.setField(this,2,e||[])},proto.eureka.v1.RetrieveLOsRequest.prototype.addTopicIds=function(e,s){return t.Message.addToRepeatedField(this,2,e,s)},proto.eureka.v1.RetrieveLOsRequest.prototype.clearTopicIdsList=function(){return this.setTopicIdsList([])},proto.eureka.v1.RetrieveLOsRequest.prototype.getWithCompleteness=function(){return t.Message.getBooleanFieldWithDefault(this,3,!1)},proto.eureka.v1.RetrieveLOsRequest.prototype.setWithCompleteness=function(e){return t.Message.setProto3BooleanField(this,3,e)},proto.eureka.v1.RetrieveLOsRequest.prototype.getLoIdsList=function(){return t.Message.getRepeatedField(this,4)},proto.eureka.v1.RetrieveLOsRequest.prototype.setLoIdsList=function(e){return t.Message.setField(this,4,e||[])},proto.eureka.v1.RetrieveLOsRequest.prototype.addLoIds=function(e,s){return t.Message.addToRepeatedField(this,4,e,s)},proto.eureka.v1.RetrieveLOsRequest.prototype.clearLoIdsList=function(){return this.setLoIdsList([])},proto.eureka.v1.RetrieveLOsRequest.prototype.getWithAchievementCrown=function(){return t.Message.getBooleanFieldWithDefault(this,5,!1)},proto.eureka.v1.RetrieveLOsRequest.prototype.setWithAchievementCrown=function(e){return t.Message.setProto3BooleanField(this,5,e)},proto.eureka.v1.RetrieveLOsResponse.repeatedFields_=[1,2,4],t.Message.GENERATE_TO_OBJECT&&(proto.eureka.v1.RetrieveLOsResponse.prototype.toObject=function(e){return proto.eureka.v1.RetrieveLOsResponse.toObject(e,this)},proto.eureka.v1.RetrieveLOsResponse.toObject=function(e,s){var r,n={learningObjectivesList:t.Message.toObjectList(s.getLearningObjectivesList(),l.LearningObjective.toObject,e),completenessesList:t.Message.toObjectList(s.getCompletenessesList(),l.Completenes.toObject,e),totalQuestionsMap:(r=s.getTotalQuestionsMap())?r.toObject(e,void 0):[],crownsList:(r=t.Message.getRepeatedField(s,4))==null?void 0:r};return e&&(n.$jspbMessageInstance=s),n}),proto.eureka.v1.RetrieveLOsResponse.deserializeBinary=function(e){var s=new t.BinaryReader(e),r=new proto.eureka.v1.RetrieveLOsResponse;return proto.eureka.v1.RetrieveLOsResponse.deserializeBinaryFromReader(r,s)},proto.eureka.v1.RetrieveLOsResponse.deserializeBinaryFromReader=function(e,s){for(;s.nextField()&&!s.isEndGroup();){var r=s.getFieldNumber();switch(r){case 1:var n=new l.LearningObjective;s.readMessage(n,l.LearningObjective.deserializeBinaryFromReader),e.addLearningObjectives(n);break;case 2:var n=new l.Completenes;s.readMessage(n,l.Completenes.deserializeBinaryFromReader),e.addCompletenesses(n);break;case 3:var n=e.getTotalQuestionsMap();s.readMessage(n,function(ee,te){t.Map.deserializeBinary(ee,te,t.BinaryReader.prototype.readString,t.BinaryReader.prototype.readInt32,null,"",0)});break;case 4:for(var O=s.isDelimited()?s.readPackedEnum():[s.readEnum()],b=0;b<O.length;b++)e.addCrowns(O[b]);break;default:s.skipField();break}}return e},proto.eureka.v1.RetrieveLOsResponse.prototype.serializeBinary=function(){var e=new t.BinaryWriter;return proto.eureka.v1.RetrieveLOsResponse.serializeBinaryToWriter(this,e),e.getResultBuffer()},proto.eureka.v1.RetrieveLOsResponse.serializeBinaryToWriter=function(e,s){var r=void 0;r=e.getLearningObjectivesList(),r.length>0&&s.writeRepeatedMessage(1,r,l.LearningObjective.serializeBinaryToWriter),r=e.getCompletenessesList(),r.length>0&&s.writeRepeatedMessage(2,r,l.Completenes.serializeBinaryToWriter),r=e.getTotalQuestionsMap(!0),r&&r.getLength()>0&&r.serializeBinary(3,s,t.BinaryWriter.prototype.writeString,t.BinaryWriter.prototype.writeInt32),r=e.getCrownsList(),r.length>0&&s.writePackedEnum(4,r)},proto.eureka.v1.RetrieveLOsResponse.prototype.getLearningObjectivesList=function(){return t.Message.getRepeatedWrapperField(this,l.LearningObjective,1)},proto.eureka.v1.RetrieveLOsResponse.prototype.setLearningObjectivesList=function(e){return t.Message.setRepeatedWrapperField(this,1,e)},proto.eureka.v1.RetrieveLOsResponse.prototype.addLearningObjectives=function(e,s){return t.Message.addToRepeatedWrapperField(this,1,e,proto.common.v1.LearningObjective,s)},proto.eureka.v1.RetrieveLOsResponse.prototype.clearLearningObjectivesList=function(){return this.setLearningObjectivesList([])},proto.eureka.v1.RetrieveLOsResponse.prototype.getCompletenessesList=function(){return t.Message.getRepeatedWrapperField(this,l.Completenes,2)},proto.eureka.v1.RetrieveLOsResponse.prototype.setCompletenessesList=function(e){return t.Message.setRepeatedWrapperField(this,2,e)},proto.eureka.v1.RetrieveLOsResponse.prototype.addCompletenesses=function(e,s){return t.Message.addToRepeatedWrapperField(this,2,e,proto.common.v1.Completenes,s)},proto.eureka.v1.RetrieveLOsResponse.prototype.clearCompletenessesList=function(){return this.setCompletenessesList([])},proto.eureka.v1.RetrieveLOsResponse.prototype.getTotalQuestionsMap=function(e){return t.Message.getMapField(this,3,e,null)},proto.eureka.v1.RetrieveLOsResponse.prototype.clearTotalQuestionsMap=function(){return this.getTotalQuestionsMap().clear(),this},proto.eureka.v1.RetrieveLOsResponse.prototype.getCrownsList=function(){return t.Message.getRepeatedField(this,4)},proto.eureka.v1.RetrieveLOsResponse.prototype.setCrownsList=function(e){return t.Message.setField(this,4,e||[])},proto.eureka.v1.RetrieveLOsResponse.prototype.addCrowns=function(e,s){return t.Message.addToRepeatedField(this,4,e,s)},proto.eureka.v1.RetrieveLOsResponse.prototype.clearCrownsList=function(){return this.setCrownsList([])},t.Message.GENERATE_TO_OBJECT&&(proto.eureka.v1.ListClassByCourseRequest.prototype.toObject=function(e){return proto.eureka.v1.ListClassByCourseRequest.toObject(e,this)},proto.eureka.v1.ListClassByCourseRequest.toObject=function(e,s){var r={courseId:t.Message.getFieldWithDefault(s,1,"")};return e&&(r.$jspbMessageInstance=s),r}),proto.eureka.v1.ListClassByCourseRequest.deserializeBinary=function(e){var s=new t.BinaryReader(e),r=new proto.eureka.v1.ListClassByCourseRequest;return proto.eureka.v1.ListClassByCourseRequest.deserializeBinaryFromReader(r,s)},proto.eureka.v1.ListClassByCourseRequest.deserializeBinaryFromReader=function(e,s){for(;s.nextField()&&!s.isEndGroup();){var r=s.getFieldNumber();switch(r){case 1:var n=s.readString();e.setCourseId(n);break;default:s.skipField();break}}return e},proto.eureka.v1.ListClassByCourseRequest.prototype.serializeBinary=function(){var e=new t.BinaryWriter;return proto.eureka.v1.ListClassByCourseRequest.serializeBinaryToWriter(this,e),e.getResultBuffer()},proto.eureka.v1.ListClassByCourseRequest.serializeBinaryToWriter=function(e,s){var r=void 0;r=e.getCourseId(),r.length>0&&s.writeString(1,r)},proto.eureka.v1.ListClassByCourseRequest.prototype.getCourseId=function(){return t.Message.getFieldWithDefault(this,1,"")},proto.eureka.v1.ListClassByCourseRequest.prototype.setCourseId=function(e){return t.Message.setProto3StringField(this,1,e)},proto.eureka.v1.ListClassByCourseResponse.repeatedFields_=[1],t.Message.GENERATE_TO_OBJECT&&(proto.eureka.v1.ListClassByCourseResponse.prototype.toObject=function(e){return proto.eureka.v1.ListClassByCourseResponse.toObject(e,this)},proto.eureka.v1.ListClassByCourseResponse.toObject=function(e,s){var r,n={classIdsList:(r=t.Message.getRepeatedField(s,1))==null?void 0:r};return e&&(n.$jspbMessageInstance=s),n}),proto.eureka.v1.ListClassByCourseResponse.deserializeBinary=function(e){var s=new t.BinaryReader(e),r=new proto.eureka.v1.ListClassByCourseResponse;return proto.eureka.v1.ListClassByCourseResponse.deserializeBinaryFromReader(r,s)},proto.eureka.v1.ListClassByCourseResponse.deserializeBinaryFromReader=function(e,s){for(;s.nextField()&&!s.isEndGroup();){var r=s.getFieldNumber();switch(r){case 1:var n=s.readString();e.addClassIds(n);break;default:s.skipField();break}}return e},proto.eureka.v1.ListClassByCourseResponse.prototype.serializeBinary=function(){var e=new t.BinaryWriter;return proto.eureka.v1.ListClassByCourseResponse.serializeBinaryToWriter(this,e),e.getResultBuffer()},proto.eureka.v1.ListClassByCourseResponse.serializeBinaryToWriter=function(e,s){var r=void 0;r=e.getClassIdsList(),r.length>0&&s.writeRepeatedString(1,r)},proto.eureka.v1.ListClassByCourseResponse.prototype.getClassIdsList=function(){return t.Message.getRepeatedField(this,1)},proto.eureka.v1.ListClassByCourseResponse.prototype.setClassIdsList=function(e){return t.Message.setField(this,1,e||[])},proto.eureka.v1.ListClassByCourseResponse.prototype.addClassIds=function(e,s){return t.Message.addToRepeatedField(this,1,e,s)},proto.eureka.v1.ListClassByCourseResponse.prototype.clearClassIdsList=function(){return this.setClassIdsList([])},t.Message.GENERATE_TO_OBJECT&&(proto.eureka.v1.ListStudentByCourseRequest.prototype.toObject=function(e){return proto.eureka.v1.ListStudentByCourseRequest.toObject(e,this)},proto.eureka.v1.ListStudentByCourseRequest.toObject=function(e,s){var r,n={courseId:t.Message.getFieldWithDefault(s,1,""),searchText:t.Message.getFieldWithDefault(s,2,""),paging:(r=s.getPaging())&&p.Paging.toObject(e,r)};return e&&(n.$jspbMessageInstance=s),n}),proto.eureka.v1.ListStudentByCourseRequest.deserializeBinary=function(e){var s=new t.BinaryReader(e),r=new proto.eureka.v1.ListStudentByCourseRequest;return proto.eureka.v1.ListStudentByCourseRequest.deserializeBinaryFromReader(r,s)},proto.eureka.v1.ListStudentByCourseRequest.deserializeBinaryFromReader=function(e,s){for(;s.nextField()&&!s.isEndGroup();){var r=s.getFieldNumber();switch(r){case 1:var n=s.readString();e.setCourseId(n);break;case 2:var n=s.readString();e.setSearchText(n);break;case 3:var n=new p.Paging;s.readMessage(n,p.Paging.deserializeBinaryFromReader),e.setPaging(n);break;default:s.skipField();break}}return e},proto.eureka.v1.ListStudentByCourseRequest.prototype.serializeBinary=function(){var e=new t.BinaryWriter;return proto.eureka.v1.ListStudentByCourseRequest.serializeBinaryToWriter(this,e),e.getResultBuffer()},proto.eureka.v1.ListStudentByCourseRequest.serializeBinaryToWriter=function(e,s){var r=void 0;r=e.getCourseId(),r.length>0&&s.writeString(1,r),r=e.getSearchText(),r.length>0&&s.writeString(2,r),r=e.getPaging(),r!=null&&s.writeMessage(3,r,p.Paging.serializeBinaryToWriter)},proto.eureka.v1.ListStudentByCourseRequest.prototype.getCourseId=function(){return t.Message.getFieldWithDefault(this,1,"")},proto.eureka.v1.ListStudentByCourseRequest.prototype.setCourseId=function(e){return t.Message.setProto3StringField(this,1,e)},proto.eureka.v1.ListStudentByCourseRequest.prototype.getSearchText=function(){return t.Message.getFieldWithDefault(this,2,"")},proto.eureka.v1.ListStudentByCourseRequest.prototype.setSearchText=function(e){return t.Message.setProto3StringField(this,2,e)},proto.eureka.v1.ListStudentByCourseRequest.prototype.getPaging=function(){return t.Message.getWrapperField(this,p.Paging,3)},proto.eureka.v1.ListStudentByCourseRequest.prototype.setPaging=function(e){return t.Message.setWrapperField(this,3,e)},proto.eureka.v1.ListStudentByCourseRequest.prototype.clearPaging=function(){return this.setPaging(void 0)},proto.eureka.v1.ListStudentByCourseRequest.prototype.hasPaging=function(){return t.Message.getField(this,3)!=null},proto.eureka.v1.ListStudentByCourseResponse.repeatedFields_=[1],t.Message.GENERATE_TO_OBJECT&&(proto.eureka.v1.ListStudentByCourseResponse.prototype.toObject=function(e){return proto.eureka.v1.ListStudentByCourseResponse.toObject(e,this)},proto.eureka.v1.ListStudentByCourseResponse.toObject=function(e,s){var r,n={profilesList:t.Message.toObjectList(s.getProfilesList(),a.BasicProfile.toObject,e),nextPage:(r=s.getNextPage())&&p.Paging.toObject(e,r)};return e&&(n.$jspbMessageInstance=s),n}),proto.eureka.v1.ListStudentByCourseResponse.deserializeBinary=function(e){var s=new t.BinaryReader(e),r=new proto.eureka.v1.ListStudentByCourseResponse;return proto.eureka.v1.ListStudentByCourseResponse.deserializeBinaryFromReader(r,s)},proto.eureka.v1.ListStudentByCourseResponse.deserializeBinaryFromReader=function(e,s){for(;s.nextField()&&!s.isEndGroup();){var r=s.getFieldNumber();switch(r){case 1:var n=new a.BasicProfile;s.readMessage(n,a.BasicProfile.deserializeBinaryFromReader),e.addProfiles(n);break;case 2:var n=new p.Paging;s.readMessage(n,p.Paging.deserializeBinaryFromReader),e.setNextPage(n);break;default:s.skipField();break}}return e},proto.eureka.v1.ListStudentByCourseResponse.prototype.serializeBinary=function(){var e=new t.BinaryWriter;return proto.eureka.v1.ListStudentByCourseResponse.serializeBinaryToWriter(this,e),e.getResultBuffer()},proto.eureka.v1.ListStudentByCourseResponse.serializeBinaryToWriter=function(e,s){var r=void 0;r=e.getProfilesList(),r.length>0&&s.writeRepeatedMessage(1,r,a.BasicProfile.serializeBinaryToWriter),r=e.getNextPage(),r!=null&&s.writeMessage(2,r,p.Paging.serializeBinaryToWriter)},proto.eureka.v1.ListStudentByCourseResponse.prototype.getProfilesList=function(){return t.Message.getRepeatedWrapperField(this,a.BasicProfile,1)},proto.eureka.v1.ListStudentByCourseResponse.prototype.setProfilesList=function(e){return t.Message.setRepeatedWrapperField(this,1,e)},proto.eureka.v1.ListStudentByCourseResponse.prototype.addProfiles=function(e,s){return t.Message.addToRepeatedWrapperField(this,1,e,proto.common.v1.BasicProfile,s)},proto.eureka.v1.ListStudentByCourseResponse.prototype.clearProfilesList=function(){return this.setProfilesList([])},proto.eureka.v1.ListStudentByCourseResponse.prototype.getNextPage=function(){return t.Message.getWrapperField(this,p.Paging,2)},proto.eureka.v1.ListStudentByCourseResponse.prototype.setNextPage=function(e){return t.Message.setWrapperField(this,2,e)},proto.eureka.v1.ListStudentByCourseResponse.prototype.clearNextPage=function(){return this.setNextPage(void 0)},proto.eureka.v1.ListStudentByCourseResponse.prototype.hasNextPage=function(){return t.Message.getField(this,2)!=null},proto.eureka.v1.ListStudentIDsByCourseRequest.repeatedFields_=[1],t.Message.GENERATE_TO_OBJECT&&(proto.eureka.v1.ListStudentIDsByCourseRequest.prototype.toObject=function(e){return proto.eureka.v1.ListStudentIDsByCourseRequest.toObject(e,this)},proto.eureka.v1.ListStudentIDsByCourseRequest.toObject=function(e,s){var r,n={courseIdsList:(r=t.Message.getRepeatedField(s,1))==null?void 0:r,paging:(r=s.getPaging())&&p.Paging.toObject(e,r)};return e&&(n.$jspbMessageInstance=s),n}),proto.eureka.v1.ListStudentIDsByCourseRequest.deserializeBinary=function(e){var s=new t.BinaryReader(e),r=new proto.eureka.v1.ListStudentIDsByCourseRequest;return proto.eureka.v1.ListStudentIDsByCourseRequest.deserializeBinaryFromReader(r,s)},proto.eureka.v1.ListStudentIDsByCourseRequest.deserializeBinaryFromReader=function(e,s){for(;s.nextField()&&!s.isEndGroup();){var r=s.getFieldNumber();switch(r){case 1:var n=s.readString();e.addCourseIds(n);break;case 2:var n=new p.Paging;s.readMessage(n,p.Paging.deserializeBinaryFromReader),e.setPaging(n);break;default:s.skipField();break}}return e},proto.eureka.v1.ListStudentIDsByCourseRequest.prototype.serializeBinary=function(){var e=new t.BinaryWriter;return proto.eureka.v1.ListStudentIDsByCourseRequest.serializeBinaryToWriter(this,e),e.getResultBuffer()},proto.eureka.v1.ListStudentIDsByCourseRequest.serializeBinaryToWriter=function(e,s){var r=void 0;r=e.getCourseIdsList(),r.length>0&&s.writeRepeatedString(1,r),r=e.getPaging(),r!=null&&s.writeMessage(2,r,p.Paging.serializeBinaryToWriter)},proto.eureka.v1.ListStudentIDsByCourseRequest.prototype.getCourseIdsList=function(){return t.Message.getRepeatedField(this,1)},proto.eureka.v1.ListStudentIDsByCourseRequest.prototype.setCourseIdsList=function(e){return t.Message.setField(this,1,e||[])},proto.eureka.v1.ListStudentIDsByCourseRequest.prototype.addCourseIds=function(e,s){return t.Message.addToRepeatedField(this,1,e,s)},proto.eureka.v1.ListStudentIDsByCourseRequest.prototype.clearCourseIdsList=function(){return this.setCourseIdsList([])},proto.eureka.v1.ListStudentIDsByCourseRequest.prototype.getPaging=function(){return t.Message.getWrapperField(this,p.Paging,2)},proto.eureka.v1.ListStudentIDsByCourseRequest.prototype.setPaging=function(e){return t.Message.setWrapperField(this,2,e)},proto.eureka.v1.ListStudentIDsByCourseRequest.prototype.clearPaging=function(){return this.setPaging(void 0)},proto.eureka.v1.ListStudentIDsByCourseRequest.prototype.hasPaging=function(){return t.Message.getField(this,2)!=null},proto.eureka.v1.ListStudentIDsByCourseResponse.repeatedFields_=[1],t.Message.GENERATE_TO_OBJECT&&(proto.eureka.v1.ListStudentIDsByCourseResponse.prototype.toObject=function(e){return proto.eureka.v1.ListStudentIDsByCourseResponse.toObject(e,this)},proto.eureka.v1.ListStudentIDsByCourseResponse.toObject=function(e,s){var r,n={studentCoursesList:t.Message.toObjectList(s.getStudentCoursesList(),proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses.toObject,e),nextPage:(r=s.getNextPage())&&p.Paging.toObject(e,r)};return e&&(n.$jspbMessageInstance=s),n}),proto.eureka.v1.ListStudentIDsByCourseResponse.deserializeBinary=function(e){var s=new t.BinaryReader(e),r=new proto.eureka.v1.ListStudentIDsByCourseResponse;return proto.eureka.v1.ListStudentIDsByCourseResponse.deserializeBinaryFromReader(r,s)},proto.eureka.v1.ListStudentIDsByCourseResponse.deserializeBinaryFromReader=function(e,s){for(;s.nextField()&&!s.isEndGroup();){var r=s.getFieldNumber();switch(r){case 1:var n=new proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses;s.readMessage(n,proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses.deserializeBinaryFromReader),e.addStudentCourses(n);break;case 2:var n=new p.Paging;s.readMessage(n,p.Paging.deserializeBinaryFromReader),e.setNextPage(n);break;default:s.skipField();break}}return e},proto.eureka.v1.ListStudentIDsByCourseResponse.prototype.serializeBinary=function(){var e=new t.BinaryWriter;return proto.eureka.v1.ListStudentIDsByCourseResponse.serializeBinaryToWriter(this,e),e.getResultBuffer()},proto.eureka.v1.ListStudentIDsByCourseResponse.serializeBinaryToWriter=function(e,s){var r=void 0;r=e.getStudentCoursesList(),r.length>0&&s.writeRepeatedMessage(1,r,proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses.serializeBinaryToWriter),r=e.getNextPage(),r!=null&&s.writeMessage(2,r,p.Paging.serializeBinaryToWriter)},proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses.repeatedFields_=[2],t.Message.GENERATE_TO_OBJECT&&(proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses.prototype.toObject=function(e){return proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses.toObject(e,this)},proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses.toObject=function(e,s){var r,n={studentId:t.Message.getFieldWithDefault(s,1,""),courseIdsList:(r=t.Message.getRepeatedField(s,2))==null?void 0:r};return e&&(n.$jspbMessageInstance=s),n}),proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses.deserializeBinary=function(e){var s=new t.BinaryReader(e),r=new proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses;return proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses.deserializeBinaryFromReader(r,s)},proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses.deserializeBinaryFromReader=function(e,s){for(;s.nextField()&&!s.isEndGroup();){var r=s.getFieldNumber();switch(r){case 1:var n=s.readString();e.setStudentId(n);break;case 2:var n=s.readString();e.addCourseIds(n);break;default:s.skipField();break}}return e},proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses.prototype.serializeBinary=function(){var e=new t.BinaryWriter;return proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses.serializeBinaryToWriter(this,e),e.getResultBuffer()},proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses.serializeBinaryToWriter=function(e,s){var r=void 0;r=e.getStudentId(),r.length>0&&s.writeString(1,r),r=e.getCourseIdsList(),r.length>0&&s.writeRepeatedString(2,r)},proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses.prototype.getStudentId=function(){return t.Message.getFieldWithDefault(this,1,"")},proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses.prototype.setStudentId=function(e){return t.Message.setProto3StringField(this,1,e)},proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses.prototype.getCourseIdsList=function(){return t.Message.getRepeatedField(this,2)},proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses.prototype.setCourseIdsList=function(e){return t.Message.setField(this,2,e||[])},proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses.prototype.addCourseIds=function(e,s){return t.Message.addToRepeatedField(this,2,e,s)},proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses.prototype.clearCourseIdsList=function(){return this.setCourseIdsList([])},proto.eureka.v1.ListStudentIDsByCourseResponse.prototype.getStudentCoursesList=function(){return t.Message.getRepeatedWrapperField(this,proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses,1)},proto.eureka.v1.ListStudentIDsByCourseResponse.prototype.setStudentCoursesList=function(e){return t.Message.setRepeatedWrapperField(this,1,e)},proto.eureka.v1.ListStudentIDsByCourseResponse.prototype.addStudentCourses=function(e,s){return t.Message.addToRepeatedWrapperField(this,1,e,proto.eureka.v1.ListStudentIDsByCourseResponse.StudentCourses,s)},proto.eureka.v1.ListStudentIDsByCourseResponse.prototype.clearStudentCoursesList=function(){return this.setStudentCoursesList([])},proto.eureka.v1.ListStudentIDsByCourseResponse.prototype.getNextPage=function(){return t.Message.getWrapperField(this,p.Paging,2)},proto.eureka.v1.ListStudentIDsByCourseResponse.prototype.setNextPage=function(e){return t.Message.setWrapperField(this,2,e)},proto.eureka.v1.ListStudentIDsByCourseResponse.prototype.clearNextPage=function(){return this.setNextPage(void 0)},proto.eureka.v1.ListStudentIDsByCourseResponse.prototype.hasNextPage=function(){return t.Message.getField(this,2)!=null},proto.eureka.v1.ListCourseIDsByStudentsRequest.repeatedFields_=[1],t.Message.GENERATE_TO_OBJECT&&(proto.eureka.v1.ListCourseIDsByStudentsRequest.prototype.toObject=function(e){return proto.eureka.v1.ListCourseIDsByStudentsRequest.toObject(e,this)},proto.eureka.v1.ListCourseIDsByStudentsRequest.toObject=function(e,s){var r,n={studentIdsList:(r=t.Message.getRepeatedField(s,1))==null?void 0:r,organizationId:t.Message.getFieldWithDefault(s,2,"")};return e&&(n.$jspbMessageInstance=s),n}),proto.eureka.v1.ListCourseIDsByStudentsRequest.deserializeBinary=function(e){var s=new t.BinaryReader(e),r=new proto.eureka.v1.ListCourseIDsByStudentsRequest;return proto.eureka.v1.ListCourseIDsByStudentsRequest.deserializeBinaryFromReader(r,s)},proto.eureka.v1.ListCourseIDsByStudentsRequest.deserializeBinaryFromReader=function(e,s){for(;s.nextField()&&!s.isEndGroup();){var r=s.getFieldNumber();switch(r){case 1:var n=s.readString();e.addStudentIds(n);break;case 2:var n=s.readString();e.setOrganizationId(n);break;default:s.skipField();break}}return e},proto.eureka.v1.ListCourseIDsByStudentsRequest.prototype.serializeBinary=function(){var e=new t.BinaryWriter;return proto.eureka.v1.ListCourseIDsByStudentsRequest.serializeBinaryToWriter(this,e),e.getResultBuffer()},proto.eureka.v1.ListCourseIDsByStudentsRequest.serializeBinaryToWriter=function(e,s){var r=void 0;r=e.getStudentIdsList(),r.length>0&&s.writeRepeatedString(1,r),r=e.getOrganizationId(),r.length>0&&s.writeString(2,r)},proto.eureka.v1.ListCourseIDsByStudentsRequest.prototype.getStudentIdsList=function(){return t.Message.getRepeatedField(this,1)},proto.eureka.v1.ListCourseIDsByStudentsRequest.prototype.setStudentIdsList=function(e){return t.Message.setField(this,1,e||[])},proto.eureka.v1.ListCourseIDsByStudentsRequest.prototype.addStudentIds=function(e,s){return t.Message.addToRepeatedField(this,1,e,s)},proto.eureka.v1.ListCourseIDsByStudentsRequest.prototype.clearStudentIdsList=function(){return this.setStudentIdsList([])},proto.eureka.v1.ListCourseIDsByStudentsRequest.prototype.getOrganizationId=function(){return t.Message.getFieldWithDefault(this,2,"")},proto.eureka.v1.ListCourseIDsByStudentsRequest.prototype.setOrganizationId=function(e){return t.Message.setProto3StringField(this,2,e)},proto.eureka.v1.ListCourseIDsByStudentsResponse.repeatedFields_=[1],t.Message.GENERATE_TO_OBJECT&&(proto.eureka.v1.ListCourseIDsByStudentsResponse.prototype.toObject=function(e){return proto.eureka.v1.ListCourseIDsByStudentsResponse.toObject(e,this)},proto.eureka.v1.ListCourseIDsByStudentsResponse.toObject=function(e,s){var r={studentCoursesList:t.Message.toObjectList(s.getStudentCoursesList(),proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses.toObject,e)};return e&&(r.$jspbMessageInstance=s),r}),proto.eureka.v1.ListCourseIDsByStudentsResponse.deserializeBinary=function(e){var s=new t.BinaryReader(e),r=new proto.eureka.v1.ListCourseIDsByStudentsResponse;return proto.eureka.v1.ListCourseIDsByStudentsResponse.deserializeBinaryFromReader(r,s)},proto.eureka.v1.ListCourseIDsByStudentsResponse.deserializeBinaryFromReader=function(e,s){for(;s.nextField()&&!s.isEndGroup();){var r=s.getFieldNumber();switch(r){case 1:var n=new proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses;s.readMessage(n,proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses.deserializeBinaryFromReader),e.addStudentCourses(n);break;default:s.skipField();break}}return e},proto.eureka.v1.ListCourseIDsByStudentsResponse.prototype.serializeBinary=function(){var e=new t.BinaryWriter;return proto.eureka.v1.ListCourseIDsByStudentsResponse.serializeBinaryToWriter(this,e),e.getResultBuffer()},proto.eureka.v1.ListCourseIDsByStudentsResponse.serializeBinaryToWriter=function(e,s){var r=void 0;r=e.getStudentCoursesList(),r.length>0&&s.writeRepeatedMessage(1,r,proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses.serializeBinaryToWriter)},proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses.repeatedFields_=[2],t.Message.GENERATE_TO_OBJECT&&(proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses.prototype.toObject=function(e){return proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses.toObject(e,this)},proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses.toObject=function(e,s){var r,n={studentId:t.Message.getFieldWithDefault(s,1,""),courseIdsList:(r=t.Message.getRepeatedField(s,2))==null?void 0:r};return e&&(n.$jspbMessageInstance=s),n}),proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses.deserializeBinary=function(e){var s=new t.BinaryReader(e),r=new proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses;return proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses.deserializeBinaryFromReader(r,s)},proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses.deserializeBinaryFromReader=function(e,s){for(;s.nextField()&&!s.isEndGroup();){var r=s.getFieldNumber();switch(r){case 1:var n=s.readString();e.setStudentId(n);break;case 2:var n=s.readString();e.addCourseIds(n);break;default:s.skipField();break}}return e},proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses.prototype.serializeBinary=function(){var e=new t.BinaryWriter;return proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses.serializeBinaryToWriter(this,e),e.getResultBuffer()},proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses.serializeBinaryToWriter=function(e,s){var r=void 0;r=e.getStudentId(),r.length>0&&s.writeString(1,r),r=e.getCourseIdsList(),r.length>0&&s.writeRepeatedString(2,r)},proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses.prototype.getStudentId=function(){return t.Message.getFieldWithDefault(this,1,"")},proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses.prototype.setStudentId=function(e){return t.Message.setProto3StringField(this,1,e)},proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses.prototype.getCourseIdsList=function(){return t.Message.getRepeatedField(this,2)},proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses.prototype.setCourseIdsList=function(e){return t.Message.setField(this,2,e||[])},proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses.prototype.addCourseIds=function(e,s){return t.Message.addToRepeatedField(this,2,e,s)},proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses.prototype.clearCourseIdsList=function(){return this.setCourseIdsList([])},proto.eureka.v1.ListCourseIDsByStudentsResponse.prototype.getStudentCoursesList=function(){return t.Message.getRepeatedWrapperField(this,proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses,1)},proto.eureka.v1.ListCourseIDsByStudentsResponse.prototype.setStudentCoursesList=function(e){return t.Message.setRepeatedWrapperField(this,1,e)},proto.eureka.v1.ListCourseIDsByStudentsResponse.prototype.addStudentCourses=function(e,s){return t.Message.addToRepeatedWrapperField(this,1,e,proto.eureka.v1.ListCourseIDsByStudentsResponse.StudentCourses,s)},proto.eureka.v1.ListCourseIDsByStudentsResponse.prototype.clearStudentCoursesList=function(){return this.setStudentCoursesList([])},proto.eureka.v1.ListStudentIDsByCourseV2Request.repeatedFields_=[1],t.Message.GENERATE_TO_OBJECT&&(proto.eureka.v1.ListStudentIDsByCourseV2Request.prototype.toObject=function(e){return proto.eureka.v1.ListStudentIDsByCourseV2Request.toObject(e,this)},proto.eureka.v1.ListStudentIDsByCourseV2Request.toObject=function(e,s){var r,n={courseIdsList:(r=t.Message.getRepeatedField(s,1))==null?void 0:r,schoolId:t.Message.getFieldWithDefault(s,2,0)};return e&&(n.$jspbMessageInstance=s),n}),proto.eureka.v1.ListStudentIDsByCourseV2Request.deserializeBinary=function(e){var s=new t.BinaryReader(e),r=new proto.eureka.v1.ListStudentIDsByCourseV2Request;return proto.eureka.v1.ListStudentIDsByCourseV2Request.deserializeBinaryFromReader(r,s)},proto.eureka.v1.ListStudentIDsByCourseV2Request.deserializeBinaryFromReader=function(e,s){for(;s.nextField()&&!s.isEndGroup();){var r=s.getFieldNumber();switch(r){case 1:var n=s.readString();e.addCourseIds(n);break;case 2:var n=s.readInt32();e.setSchoolId(n);break;default:s.skipField();break}}return e},proto.eureka.v1.ListStudentIDsByCourseV2Request.prototype.serializeBinary=function(){var e=new t.BinaryWriter;return proto.eureka.v1.ListStudentIDsByCourseV2Request.serializeBinaryToWriter(this,e),e.getResultBuffer()},proto.eureka.v1.ListStudentIDsByCourseV2Request.serializeBinaryToWriter=function(e,s){var r=void 0;r=e.getCourseIdsList(),r.length>0&&s.writeRepeatedString(1,r),r=e.getSchoolId(),r!==0&&s.writeInt32(2,r)},proto.eureka.v1.ListStudentIDsByCourseV2Request.prototype.getCourseIdsList=function(){return t.Message.getRepeatedField(this,1)},proto.eureka.v1.ListStudentIDsByCourseV2Request.prototype.setCourseIdsList=function(e){return t.Message.setField(this,1,e||[])},proto.eureka.v1.ListStudentIDsByCourseV2Request.prototype.addCourseIds=function(e,s){return t.Message.addToRepeatedField(this,1,e,s)},proto.eureka.v1.ListStudentIDsByCourseV2Request.prototype.clearCourseIdsList=function(){return this.setCourseIdsList([])},proto.eureka.v1.ListStudentIDsByCourseV2Request.prototype.getSchoolId=function(){return t.Message.getFieldWithDefault(this,2,0)},proto.eureka.v1.ListStudentIDsByCourseV2Request.prototype.setSchoolId=function(e){return t.Message.setProto3IntField(this,2,e)},t.Message.GENERATE_TO_OBJECT&&(proto.eureka.v1.ListStudentIDsByCourseV2Response.prototype.toObject=function(e){return proto.eureka.v1.ListStudentIDsByCourseV2Response.toObject(e,this)},proto.eureka.v1.ListStudentIDsByCourseV2Response.toObject=function(e,s){var r,n={studentCourses:(r=s.getStudentCourses())&&proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses.toObject(e,r)};return e&&(n.$jspbMessageInstance=s),n}),proto.eureka.v1.ListStudentIDsByCourseV2Response.deserializeBinary=function(e){var s=new t.BinaryReader(e),r=new proto.eureka.v1.ListStudentIDsByCourseV2Response;return proto.eureka.v1.ListStudentIDsByCourseV2Response.deserializeBinaryFromReader(r,s)},proto.eureka.v1.ListStudentIDsByCourseV2Response.deserializeBinaryFromReader=function(e,s){for(;s.nextField()&&!s.isEndGroup();){var r=s.getFieldNumber();switch(r){case 1:var n=new proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses;s.readMessage(n,proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses.deserializeBinaryFromReader),e.setStudentCourses(n);break;default:s.skipField();break}}return e},proto.eureka.v1.ListStudentIDsByCourseV2Response.prototype.serializeBinary=function(){var e=new t.BinaryWriter;return proto.eureka.v1.ListStudentIDsByCourseV2Response.serializeBinaryToWriter(this,e),e.getResultBuffer()},proto.eureka.v1.ListStudentIDsByCourseV2Response.serializeBinaryToWriter=function(e,s){var r=void 0;r=e.getStudentCourses(),r!=null&&s.writeMessage(1,r,proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses.serializeBinaryToWriter)},proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses.repeatedFields_=[2],t.Message.GENERATE_TO_OBJECT&&(proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses.prototype.toObject=function(e){return proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses.toObject(e,this)},proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses.toObject=function(e,s){var r,n={studentId:t.Message.getFieldWithDefault(s,1,""),courseIdsList:(r=t.Message.getRepeatedField(s,2))==null?void 0:r};return e&&(n.$jspbMessageInstance=s),n}),proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses.deserializeBinary=function(e){var s=new t.BinaryReader(e),r=new proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses;return proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses.deserializeBinaryFromReader(r,s)},proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses.deserializeBinaryFromReader=function(e,s){for(;s.nextField()&&!s.isEndGroup();){var r=s.getFieldNumber();switch(r){case 1:var n=s.readString();e.setStudentId(n);break;case 2:var n=s.readString();e.addCourseIds(n);break;default:s.skipField();break}}return e},proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses.prototype.serializeBinary=function(){var e=new t.BinaryWriter;return proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses.serializeBinaryToWriter(this,e),e.getResultBuffer()},proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses.serializeBinaryToWriter=function(e,s){var r=void 0;r=e.getStudentId(),r.length>0&&s.writeString(1,r),r=e.getCourseIdsList(),r.length>0&&s.writeRepeatedString(2,r)},proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses.prototype.getStudentId=function(){return t.Message.getFieldWithDefault(this,1,"")},proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses.prototype.setStudentId=function(e){return t.Message.setProto3StringField(this,1,e)},proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses.prototype.getCourseIdsList=function(){return t.Message.getRepeatedField(this,2)},proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses.prototype.setCourseIdsList=function(e){return t.Message.setField(this,2,e||[])},proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses.prototype.addCourseIds=function(e,s){return t.Message.addToRepeatedField(this,2,e,s)},proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses.prototype.clearCourseIdsList=function(){return this.setCourseIdsList([])},proto.eureka.v1.ListStudentIDsByCourseV2Response.prototype.getStudentCourses=function(){return t.Message.getWrapperField(this,proto.eureka.v1.ListStudentIDsByCourseV2Response.StudentCourses,1)},proto.eureka.v1.ListStudentIDsByCourseV2Response.prototype.setStudentCourses=function(e){return t.Message.setWrapperField(this,1,e)},proto.eureka.v1.ListStudentIDsByCourseV2Response.prototype.clearStudentCourses=function(){return this.setStudentCourses(void 0)},proto.eureka.v1.ListStudentIDsByCourseV2Response.prototype.hasStudentCourses=function(){return t.Message.getField(this,1)!=null},t.Message.GENERATE_TO_OBJECT&&(proto.eureka.v1.ListTopicsByStudyPlanRequest.prototype.toObject=function(e){return proto.eureka.v1.ListTopicsByStudyPlanRequest.toObject(e,this)},proto.eureka.v1.ListTopicsByStudyPlanRequest.toObject=function(e,s){var r,n={paging:(r=s.getPaging())&&p.Paging.toObject(e,r),studyPlanId:t.Message.getFieldWithDefault(s,2,"")};return e&&(n.$jspbMessageInstance=s),n}),proto.eureka.v1.ListTopicsByStudyPlanRequest.deserializeBinary=function(e){var s=new t.BinaryReader(e),r=new proto.eureka.v1.ListTopicsByStudyPlanRequest;return proto.eureka.v1.ListTopicsByStudyPlanRequest.deserializeBinaryFromReader(r,s)},proto.eureka.v1.ListTopicsByStudyPlanRequest.deserializeBinaryFromReader=function(e,s){for(;s.nextField()&&!s.isEndGroup();){var r=s.getFieldNumber();switch(r){case 1:var n=new p.Paging;s.readMessage(n,p.Paging.deserializeBinaryFromReader),e.setPaging(n);break;case 2:var n=s.readString();e.setStudyPlanId(n);break;default:s.skipField();break}}return e},proto.eureka.v1.ListTopicsByStudyPlanRequest.prototype.serializeBinary=function(){var e=new t.BinaryWriter;return proto.eureka.v1.ListTopicsByStudyPlanRequest.serializeBinaryToWriter(this,e),e.getResultBuffer()},proto.eureka.v1.ListTopicsByStudyPlanRequest.serializeBinaryToWriter=function(e,s){var r=void 0;r=e.getPaging(),r!=null&&s.writeMessage(1,r,p.Paging.serializeBinaryToWriter),r=e.getStudyPlanId(),r.length>0&&s.writeString(2,r)},proto.eureka.v1.ListTopicsByStudyPlanRequest.prototype.getPaging=function(){return t.Message.getWrapperField(this,p.Paging,1)},proto.eureka.v1.ListTopicsByStudyPlanRequest.prototype.setPaging=function(e){return t.Message.setWrapperField(this,1,e)},proto.eureka.v1.ListTopicsByStudyPlanRequest.prototype.clearPaging=function(){return this.setPaging(void 0)},proto.eureka.v1.ListTopicsByStudyPlanRequest.prototype.hasPaging=function(){return t.Message.getField(this,1)!=null},proto.eureka.v1.ListTopicsByStudyPlanRequest.prototype.getStudyPlanId=function(){return t.Message.getFieldWithDefault(this,2,"")},proto.eureka.v1.ListTopicsByStudyPlanRequest.prototype.setStudyPlanId=function(e){return t.Message.setProto3StringField(this,2,e)},proto.eureka.v1.ListTopicsByStudyPlanResponse.repeatedFields_=[2],t.Message.GENERATE_TO_OBJECT&&(proto.eureka.v1.ListTopicsByStudyPlanResponse.prototype.toObject=function(e){return proto.eureka.v1.ListTopicsByStudyPlanResponse.toObject(e,this)},proto.eureka.v1.ListTopicsByStudyPlanResponse.toObject=function(e,s){var r,n={nextPage:(r=s.getNextPage())&&p.Paging.toObject(e,r),itemsList:t.Message.toObjectList(s.getItemsList(),l.Topic.toObject,e)};return e&&(n.$jspbMessageInstance=s),n}),proto.eureka.v1.ListTopicsByStudyPlanResponse.deserializeBinary=function(e){var s=new t.BinaryReader(e),r=new proto.eureka.v1.ListTopicsByStudyPlanResponse;return proto.eureka.v1.ListTopicsByStudyPlanResponse.deserializeBinaryFromReader(r,s)},proto.eureka.v1.ListTopicsByStudyPlanResponse.deserializeBinaryFromReader=function(e,s){for(;s.nextField()&&!s.isEndGroup();){var r=s.getFieldNumber();switch(r){case 1:var n=new p.Paging;s.readMessage(n,p.Paging.deserializeBinaryFromReader),e.setNextPage(n);break;case 2:var n=new l.Topic;s.readMessage(n,l.Topic.deserializeBinaryFromReader),e.addItems(n);break;default:s.skipField();break}}return e},proto.eureka.v1.ListTopicsByStudyPlanResponse.prototype.serializeBinary=function(){var e=new t.BinaryWriter;return proto.eureka.v1.ListTopicsByStudyPlanResponse.serializeBinaryToWriter(this,e),e.getResultBuffer()},proto.eureka.v1.ListTopicsByStudyPlanResponse.serializeBinaryToWriter=function(e,s){var r=void 0;r=e.getNextPage(),r!=null&&s.writeMessage(1,r,p.Paging.serializeBinaryToWriter),r=e.getItemsList(),r.length>0&&s.writeRepeatedMessage(2,r,l.Topic.serializeBinaryToWriter)},proto.eureka.v1.ListTopicsByStudyPlanResponse.prototype.getNextPage=function(){return t.Message.getWrapperField(this,p.Paging,1)},proto.eureka.v1.ListTopicsByStudyPlanResponse.prototype.setNextPage=function(e){return t.Message.setWrapperField(this,1,e)},proto.eureka.v1.ListTopicsByStudyPlanResponse.prototype.clearNextPage=function(){return this.setNextPage(void 0)},proto.eureka.v1.ListTopicsByStudyPlanResponse.prototype.hasNextPage=function(){return t.Message.getField(this,1)!=null},proto.eureka.v1.ListTopicsByStudyPlanResponse.prototype.getItemsList=function(){return t.Message.getRepeatedWrapperField(this,l.Topic,2)},proto.eureka.v1.ListTopicsByStudyPlanResponse.prototype.setItemsList=function(e){return t.Message.setRepeatedWrapperField(this,2,e)},proto.eureka.v1.ListTopicsByStudyPlanResponse.prototype.addItems=function(e,s){return t.Message.addToRepeatedWrapperField(this,2,e,proto.common.v1.Topic,s)},proto.eureka.v1.ListTopicsByStudyPlanResponse.prototype.clearItemsList=function(){return this.setItemsList([])},o.object.extend(i,proto.eureka.v1)})(q);const c={};c.web=be;const d={};d.eureka={};d.eureka.v1=q;d.eureka.v1.CourseReaderServiceClient=function(i,t,o){o||(o={}),o.format="text",this.client_=new c.web.GrpcWebClientBase(o),this.hostname_=i};d.eureka.v1.CourseReaderServicePromiseClient=function(i,t,o){o||(o={}),o.format="text",this.client_=new c.web.GrpcWebClientBase(o),this.hostname_=i};const Q=new c.web.MethodDescriptor("/eureka.v1.CourseReaderService/RetrieveLOs",c.web.MethodType.UNARY,d.eureka.v1.RetrieveLOsRequest,d.eureka.v1.RetrieveLOsResponse,function(i){return i.serializeBinary()},d.eureka.v1.RetrieveLOsResponse.deserializeBinary);new c.web.AbstractClientBase.MethodInfo(d.eureka.v1.RetrieveLOsResponse,function(i){return i.serializeBinary()},d.eureka.v1.RetrieveLOsResponse.deserializeBinary);d.eureka.v1.CourseReaderServiceClient.prototype.retrieveLOs=function(i,t,o){return this.client_.rpcCall(this.hostname_+"/eureka.v1.CourseReaderService/RetrieveLOs",i,t||{},Q,o)};d.eureka.v1.CourseReaderServicePromiseClient.prototype.retrieveLOs=function(i,t){return this.client_.unaryCall(this.hostname_+"/eureka.v1.CourseReaderService/RetrieveLOs",i,t||{},Q)};const U=new c.web.MethodDescriptor("/eureka.v1.CourseReaderService/ListTopicsByStudyPlan",c.web.MethodType.UNARY,d.eureka.v1.ListTopicsByStudyPlanRequest,d.eureka.v1.ListTopicsByStudyPlanResponse,function(i){return i.serializeBinary()},d.eureka.v1.ListTopicsByStudyPlanResponse.deserializeBinary);new c.web.AbstractClientBase.MethodInfo(d.eureka.v1.ListTopicsByStudyPlanResponse,function(i){return i.serializeBinary()},d.eureka.v1.ListTopicsByStudyPlanResponse.deserializeBinary);d.eureka.v1.CourseReaderServiceClient.prototype.listTopicsByStudyPlan=function(i,t,o){return this.client_.rpcCall(this.hostname_+"/eureka.v1.CourseReaderService/ListTopicsByStudyPlan",i,t||{},U,o)};d.eureka.v1.CourseReaderServicePromiseClient.prototype.listTopicsByStudyPlan=function(i,t){return this.client_.unaryCall(this.hostname_+"/eureka.v1.CourseReaderService/ListTopicsByStudyPlan",i,t||{},U)};const J=new c.web.MethodDescriptor("/eureka.v1.CourseReaderService/ListClassByCourse",c.web.MethodType.UNARY,d.eureka.v1.ListClassByCourseRequest,d.eureka.v1.ListClassByCourseResponse,function(i){return i.serializeBinary()},d.eureka.v1.ListClassByCourseResponse.deserializeBinary);new c.web.AbstractClientBase.MethodInfo(d.eureka.v1.ListClassByCourseResponse,function(i){return i.serializeBinary()},d.eureka.v1.ListClassByCourseResponse.deserializeBinary);d.eureka.v1.CourseReaderServiceClient.prototype.listClassByCourse=function(i,t,o){return this.client_.rpcCall(this.hostname_+"/eureka.v1.CourseReaderService/ListClassByCourse",i,t||{},J,o)};d.eureka.v1.CourseReaderServicePromiseClient.prototype.listClassByCourse=function(i,t){return this.client_.unaryCall(this.hostname_+"/eureka.v1.CourseReaderService/ListClassByCourse",i,t||{},J)};const Y=new c.web.MethodDescriptor("/eureka.v1.CourseReaderService/ListStudentByCourse",c.web.MethodType.UNARY,d.eureka.v1.ListStudentByCourseRequest,d.eureka.v1.ListStudentByCourseResponse,function(i){return i.serializeBinary()},d.eureka.v1.ListStudentByCourseResponse.deserializeBinary);new c.web.AbstractClientBase.MethodInfo(d.eureka.v1.ListStudentByCourseResponse,function(i){return i.serializeBinary()},d.eureka.v1.ListStudentByCourseResponse.deserializeBinary);d.eureka.v1.CourseReaderServiceClient.prototype.listStudentByCourse=function(i,t,o){return this.client_.rpcCall(this.hostname_+"/eureka.v1.CourseReaderService/ListStudentByCourse",i,t||{},Y,o)};d.eureka.v1.CourseReaderServicePromiseClient.prototype.listStudentByCourse=function(i,t){return this.client_.unaryCall(this.hostname_+"/eureka.v1.CourseReaderService/ListStudentByCourse",i,t||{},Y)};const H=new c.web.MethodDescriptor("/eureka.v1.CourseReaderService/ListStudentIDsByCourse",c.web.MethodType.UNARY,d.eureka.v1.ListStudentIDsByCourseRequest,d.eureka.v1.ListStudentIDsByCourseResponse,function(i){return i.serializeBinary()},d.eureka.v1.ListStudentIDsByCourseResponse.deserializeBinary);new c.web.AbstractClientBase.MethodInfo(d.eureka.v1.ListStudentIDsByCourseResponse,function(i){return i.serializeBinary()},d.eureka.v1.ListStudentIDsByCourseResponse.deserializeBinary);d.eureka.v1.CourseReaderServiceClient.prototype.listStudentIDsByCourse=function(i,t,o){return this.client_.rpcCall(this.hostname_+"/eureka.v1.CourseReaderService/ListStudentIDsByCourse",i,t||{},H,o)};d.eureka.v1.CourseReaderServicePromiseClient.prototype.listStudentIDsByCourse=function(i,t){return this.client_.unaryCall(this.hostname_+"/eureka.v1.CourseReaderService/ListStudentIDsByCourse",i,t||{},H)};const Z=new c.web.MethodDescriptor("/eureka.v1.CourseReaderService/ListCourseIDsByStudents",c.web.MethodType.UNARY,d.eureka.v1.ListCourseIDsByStudentsRequest,d.eureka.v1.ListCourseIDsByStudentsResponse,function(i){return i.serializeBinary()},d.eureka.v1.ListCourseIDsByStudentsResponse.deserializeBinary);new c.web.AbstractClientBase.MethodInfo(d.eureka.v1.ListCourseIDsByStudentsResponse,function(i){return i.serializeBinary()},d.eureka.v1.ListCourseIDsByStudentsResponse.deserializeBinary);d.eureka.v1.CourseReaderServiceClient.prototype.listCourseIDsByStudents=function(i,t,o){return this.client_.rpcCall(this.hostname_+"/eureka.v1.CourseReaderService/ListCourseIDsByStudents",i,t||{},Z,o)};d.eureka.v1.CourseReaderServicePromiseClient.prototype.listCourseIDsByStudents=function(i,t){return this.client_.unaryCall(this.hostname_+"/eureka.v1.CourseReaderService/ListCourseIDsByStudents",i,t||{},Z)};const K=new c.web.MethodDescriptor("/eureka.v1.CourseReaderService/ListStudentIDsByCourseV2",c.web.MethodType.SERVER_STREAMING,d.eureka.v1.ListStudentIDsByCourseV2Request,d.eureka.v1.ListStudentIDsByCourseV2Response,function(i){return i.serializeBinary()},d.eureka.v1.ListStudentIDsByCourseV2Response.deserializeBinary);new c.web.AbstractClientBase.MethodInfo(d.eureka.v1.ListStudentIDsByCourseV2Response,function(i){return i.serializeBinary()},d.eureka.v1.ListStudentIDsByCourseV2Response.deserializeBinary);d.eureka.v1.CourseReaderServiceClient.prototype.listStudentIDsByCourseV2=function(i,t){return this.client_.serverStreaming(this.hostname_+"/eureka.v1.CourseReaderService/ListStudentIDsByCourseV2",i,t||{},K)};d.eureka.v1.CourseReaderServicePromiseClient.prototype.listStudentIDsByCourseV2=function(i,t){return this.client_.serverStreaming(this.hostname_+"/eureka.v1.CourseReaderService/ListStudentIDsByCourseV2",i,t||{},K)};var et=d.eureka.v1;const tt=({studyPlanId:i,paging:{limit:t,offsetInteger:o}})=>{const u=new q.ListTopicsByStudyPlanRequest,a=new x.Paging;return a.setLimit(t),a.setOffsetInteger(o),u.setStudyPlanId(i),u.setPaging(a),u};class st extends T{async listTopicsByStudyPlan(t){const o=tt(t);return(await this._call("listTopicsByStudyPlan",o)).toObject()}}const rt=new st(et.CourseReaderServicePromiseClient,C,w),ot=g({query:{TOPIC_GET_LIST_BY_STUDY_PLAN:i=>{const{studyPlanId:t,paging:o}=i;return t&&o?rt.listTopicsByStudyPlan(i):L(void 0)}}}),it=y`
    query GetListCourseStudentStudyPlansByFilter(
        $courseId: String!
        $grades: _int4 = "{}"
        $limit: Int = 10
        $search: String = ""
        $bookIds: _text = "{}"
        $status: String = "STUDY_PLAN_STATUS_ACTIVE"
        $offset: Int = 0
    ) {
        get_list_course_student_study_plans_by_filter(
            args: {
                _course_id: $courseId
                _grades: $grades
                search: $search
                _status: $status
                _book_ids: $bookIds
            }
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
        ) {
            course_id
            student_id
        }
        get_list_course_student_study_plans_by_filter_aggregate(
            args: {
                _course_id: $courseId
                _grades: $grades
                search: $search
                _status: $status
                _book_ids: $bookIds
            }
        ) {
            aggregate {
                count
            }
        }
    }
`;class nt extends S{async getListByFilter(t){var a,p,l,v;const o={query:it,variables:t},u=await this._call(o);return{data:(a=u.data)==null?void 0:a.get_list_course_student_study_plans_by_filter,total:(v=(l=(p=u.data)==null?void 0:p.get_list_course_student_study_plans_by_filter_aggregate.aggregate)==null?void 0:l.count)!=null?v:0}}}const ut=new nt(C,"eurekaGraphQL",B),f=i=>`{${i.join(",")}}`,at=g({query:{COURSE_STUDENT_GET_LIST_BY_FILTER:i=>{const{bookIds:t,grades:o,limit:u,offset:a,courseId:p,search:l}=i;return p&&u?ut.getListByFilter({grades:R(o)?f(o):void 0,bookIds:R(t)?f(t):void 0,courseId:p,limit:u,offset:a,search:l}):L(void 0)}}});y`
    fragment StudyPlanItemAttrs on study_plan_items {
        study_plan_item_id
        available_from
        available_to
        content_structure
        start_date
        end_date
        status
        assignment_study_plan_item {
            assignment_id
        }
        lo_study_plan_item {
            lo_id
        }
    }
`;const dt=y`
    query CourseStudyPlansListByFilter(
        $courseId: String!
        $grades: _int4 = "{}"
        $limit: Int = 10
        $search: String = ""
        $bookIds: _text = "{}"
        $status: _text = "{}"
        $offset: Int = 0
    ) {
        get_list_course_study_plan_by_filter(
            args: {
                _course_id: $courseId
                _grades: $grades
                search: $search
                _status: $status
                _book_ids: $bookIds
            }
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
        ) {
            ...CourseStudyPlanAttrsV3
        }
        get_list_course_study_plan_by_filter_aggregate(
            args: {
                _course_id: $courseId
                _grades: $grades
                search: $search
                _status: $status
                _book_ids: $bookIds
            }
        ) {
            aggregate {
                count
            }
        }
    }

    fragment CourseStudyPlanAttrsV3 on course_study_plans {
        course_id
        study_plan_id
        study_plan {
            ...StudyPlanAttrsV3
        }
    }
    ${N}
`;class pt extends S{async getListFilter(t){var a,p,l,v;const o={query:dt,variables:t},u=await this._call(o);return{data:(a=u.data)==null?void 0:a.get_list_course_study_plan_by_filter,total:(v=(l=(p=u.data)==null?void 0:p.get_list_course_study_plan_by_filter_aggregate.aggregate)==null?void 0:l.count)!=null?v:0}}}const lt=new pt(C,"eurekaGraphQL",B),ct=g({query:{COURSE_STUDY_PLAN_GET_LIST_FILTER:i=>{const{courseId:t,limit:o,search:u,offset:a,grades:p,bookIds:l,status:v}=i;return t&&o?lt.getListFilter({grades:R(p)?f(p):void 0,bookIds:R(l)?f(l):void 0,status:R(v)?f(v):void 0,search:u,courseId:t,limit:o,offset:a}):L(void 0)}}}),yt=y`
    query GetManyStudentStudyPlansByFilter(
        $courseId: String!
        $grades: _int4 = "{}"
        $search: String = ""
        $bookIds: _text = "{}"
        $status: String = "STUDY_PLAN_STATUS_ACTIVE"
        $studentIds: _text = "{}"
    ) {
        get_student_study_plans_by_filter(
            args: {
                _course_id: $courseId
                _book_ids: $bookIds
                _grades: $grades
                _status: $status
                search: $search
                _student_ids: $studentIds
            }
            order_by: { created_at: desc }
        ) {
            ...StudyPlanAttrsV3
            student_study_plans {
                student_id
            }
        }
    }

    ${N}
`;class vt extends S{async getManyV2(t){var a;const o={query:yt,variables:t};return(a=(await this._call(o)).data)==null?void 0:a.get_student_study_plans_by_filter}}const gt=new vt(C,"eurekaGraphQL",B),Ct=g({query:{STUDENT_STUDY_PLAN_GET_MANY_BY_FILTER:i=>{const{courseId:t,search:o,studentIds:u,grades:a,bookIds:p}=i;return t&&R(u)?gt.getManyV2({courseId:t,grades:R(a)?f(a):void 0,bookIds:R(p)?f(p):void 0,search:o,studentIds:R(u)?f(u):void 0}):L(void 0)}}}),Rt=y`
    fragment StudentUserAttrs on users {
        user_id
        name
        email
        avatar
    }
`,Bt=y`
    query StudentsMany($user_ids: [String!] = []) {
        users(where: { user_group: { _eq: "USER_GROUP_STUDENT" }, user_id: { _in: $user_ids } }) {
            ...StudentUserAttrs
        }
    }
    ${Rt}
`;class St extends S{async getMany(t){var a;const o={query:Bt,variables:t};return(a=(await this._call(o)).data)==null?void 0:a.users}}const Lt=new St(C,"bobGraphQL",B),ft=g({query:{STUDENT_GET_MANY:i=>R(i.user_ids)?Lt.getMany(i):L(void 0)}}),kt=y`
    query TopicAssignmentMany($topic_id: String!) {
        topics_assignments(
            where: { topic_id: { _eq: $topic_id } }
            order_by: { display_order: asc }
        ) {
            display_order
            assignment {
                ...AssignmentAttrs
            }
        }
    }
    ${ie}
`;class _t extends S{async getManyByTopicId(t){var a;const o={query:kt,variables:t};return(a=(await this._call(o)).data)==null?void 0:a.topics_assignments}}const It=new _t(C,"eurekaGraphQL",B),ht=g({query:{syllabusTopicAssignmentGetManyByTopicId:i=>i.topic_id?It.getManyByTopicId(i):L(void 0)}}),bt=y`
    query TopicLearningObjectiveMany($topic_id: String!) {
        topics_learning_objectives(
            where: { topic_id: { _eq: $topic_id } }
            order_by: { display_order: desc }
        ) {
            display_order
            learning_objective {
                ...LearningObjectiveAttrs
            }
        }
    }
    ${ne}
`;class Dt extends S{async getMany(t){var a;const o={query:bt,variables:t};return(a=(await this._call(o)).data)==null?void 0:a.topics_learning_objectives}}const Mt=new Dt(C,"bobGraphQL",B,{shouldRedirectEureka:!0}),Ft=g({query:{TOPIC_LEARNING_OBJECTIVE_GET_MANY:i=>i.topic_id?Mt.getMany(i):L(void 0)}}),X=de({book:pe,topicLearningObjective:Ft,topicAssignment:ht,quizzes:le,learningObjective:ce,courses:je,assignment:ye,media:ve,brightcove:Xe,chapter:ge,courseStudyPlan:ct,student:ft,studentStudyPlan:Ct,courseStudent:at,studyPlan:Ce,courseReader:ot,topic:Re,lessonsSyllabus:Ne,lessonGroups:Be,masterReader:Ue,class:we,location:Ze}),Ot=ue(X),Pt=ae(X);export{Pt as a,we as c,Ot as i};
