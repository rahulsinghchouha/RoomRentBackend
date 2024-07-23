const {authentication} = require("../controllers/userProfile");

const router = express.Router();

router.post("/signUp",authentication);
