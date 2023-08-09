import e from 'express'
import { createRoom, joinRoom } from '../../controllers/roomController'

const router = e.Router()

router.post('/create', createRoom)
router.post('/join', joinRoom)

export default router