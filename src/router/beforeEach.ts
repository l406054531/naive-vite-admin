import router from "./index"
router.beforeEach(async (to, from, next) => {
        console.log(to);
        
    next()
})