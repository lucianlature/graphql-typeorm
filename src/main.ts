import 'source-map-support/register'
import { SayGoodbye } from './mymodule'

const log = console.log('Hey there, VSCode user!')
const goodBye = SayGoodbye(console.log)