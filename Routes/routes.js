// Routes
const {Router} = require ("express")
const { loginUser, createUser,  } = require ("../Controllers/UserController")


const router = Router()

router.post('/login', loginUser)
router.post('/register', createUser)


  
module.exports = router
