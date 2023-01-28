
/* Tin Can configuration */

//
// ActivityID that is sent for the statement's object
ANALYTICS_COURSE_ID = "https://ASC.authr.it/activities/course/101319";

//
// CourseName for the activity
//
ANALYTICS_COURSE_NAME = {
    "en-US": "Cookie Baking Class"
};

//
// CourseDesc for the activity
//
ANALYTICS_COURSE_DESC = {
    "en-US": "Cookies\nBaking\nVegan\n"
};

//
// Pre-configured LRSes that should receive data, added to what is included
// in the URL and/or passed to the constructor function.
//
// An array of objects where each object may have the following properties:
//
//    endpoint: (including trailing slash '/')
//    auth:
//    allowFail: (boolean, default true)
//
ANALYTICS_RECORD_STORES = [
	
];

ANALYTICS_USE_QUERY_STRING_ENDPOINT = false;
