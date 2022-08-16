import Cookie from 'js-cookie'

export default{
    auth(to, from, next) {
       
        const token = Cookie.get(import.meta.env.VITE_NAME_COOKIE_AUTH)
        
        // TODO = Check token is valid with request api

        if(!token) {
            next('/login')
        }

        next()
    }
}