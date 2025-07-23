import { del, get, post } from "./api_helper";


export const auth = {
    validate: () => get('/validate'),
    logout: () => get("/logout"),
    login:(data:FormData) => post('/login',data),
    register:(data:FormData) => post('/register',data),
}

export const dashboard_apis = {
    getData:(interval:FormData)=>post(`/dashboard-analytics`,interval),
}

export const role_apis = {
    create:(formData:FormData)=>post('/new-role',formData),
    update: (data:FormData,id:string|number)=>post(`/update-role/${id}`,data),
    list: ()=>get(`/roles`),
    select: (id:string|number)=>get(`/roles/${id}`),
    trash: (id:string|number)=> del(`/role/${id}`)
}



export const user_apis = {
    create:(data:FormData)=>post(`/new-user`,data),
    update:(data:FormData,id:string|number)=>post(`/update-user/${id}`,data),
    list:(searchQuery?:string|null)=>get(`/users${searchQuery??''}`),
    select:(id:string|number)=>get(`/get-user-details/${id}`),
    trash:(id:string|number)=>del(`/user/${id}`),
    toggleStatus:(id:string|number)=>get(`/toggle-user-status/${id}`),
    toggleBlockStatus:(id:string|number)=>get(`/toggle-user-block-status/${id}`),
    changePhone:(id:string|number,phone:string)=>get(`/update-user-phone/${id}/${phone}`),
    changeEmail:(id:string|number,email:string)=>get(`/update-user-email/${id}/${email}`),
    changePassword:(data:FormData)=>post(`/update-user-password`,data),
    
    // additional details apis
    saveDetail:(data:FormData,id:string|number)=>post(`/user-details/${id}`,data),
    saveDetails:(data:FormData,id:string|number)=>post(`/user-details-bulk/${id}`,data),
    deleteDetail:(id:string|number,key:string)=>del(`/user-details/${id}/${key}`)
    
}

export const kbc = {
    event_apis : {
        createEvent: (data:FormData) => post('/kbc-event/create', data),
        setEventStatus: (parameters:string) => get('/kbc-event/set-status?' + parameters),
        setEventQuestion: (parameters:string) => get('/kbc-event/set-question?' + parameters),
        assignQuestions: (data:FormData) => post('/kbc-event/assign-questions',data),
        setEventQuestionLockStatus: (parameters:string) => get('/kbc-event/lock-status?' + parameters),
        revealEventQuestionAnswer: (parameters:string) => get('/kbc-event/answer-reveal?' + parameters),
        getEventList: (parameters?:string|null) => get(`/kbc-event/list?${parameters}`),
        getEventresult: (event_id?:number,parameters?:string|null) => get(`kbc-event/get-first-model-result/${event_id}?${parameters}`),
        deleteEvent: (id:string|number) => del(`/kbc-event/delete/${id}`),
        createQuestion: (data:FormData) => post('/kbc-question/create', data),
        getQuestionList: (parameters?:string|null) => get(`/kbc-question/list?${parameters}`),
        updateQuestion: (data:FormData, id:string|number) => post(`/kbc-question/update/${id}`, data),
        deleteQuestion: (id:string|number) => del(`/kbc-question/delete/${id}`),  //complete
    },
    audiance_apis: {
        subscribeEvent: (parameters:string) => get('/kbc-audience/subscribe-event?event_id=' + parameters), 
        mysubscriptions: () => get('/kbc-audience/my-subscriptions'), 
        storeAnswer: (parameters:string) => get('/kbc-audience/store-answer?' + parameters),
        getEventUpdates: (parameters:string) => get('/kbc-audience/event-updates?' + parameters),
    }
}






