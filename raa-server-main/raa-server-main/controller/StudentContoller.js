const express = require( 'express' )
const router = express.Router()
const formidable = require('formidable')
const log4js = require( 'log4js' )
const bodyParser = require( 'body-parser' )
const StudentDTO = require('../dto/StudentDTO')
const StudentService = require('../service/StudentService')
const cors = require('cors')

const logger = log4js.getLogger()
logger.level = 'info'

const studentService = new StudentService()

router.use( bodyParser.json() )
router.use( bodyParser.urlencoded( { extended: false } ) )
let corsConfig = { /*origin: 'http://localhost:3000/'*/}

router.use(cors(corsConfig))

router.post( '/', ( req, res ) => addStudents(req, res) )

const addStudents = async (req, res) => {
    logger.info('Entering | StudentController::addStudents')
    let studentDTO = new StudentDTO(true,null,'',null)
    let form = new formidable.IncomingForm()
    await form.parse( req, async function ( err, fields, files ) {
        // files contains the name list of students with the filed name "file"
        // fields contains type = department/class/individual, dept, batch
        if ( err ) {
            studentDTO.success = false
            studentDTO.description = err
        }
        if(studentDTO.success){
            studentDTO = await studentService.addStudents(files.file, fields, studentDTO)
        }
        res.json(studentDTO.json)
        logger.info('Exiting | StudentController::addStudents')
        res.end()
    } )
}

module.exports = router