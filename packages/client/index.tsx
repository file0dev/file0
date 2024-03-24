import './index.css'
import './src/index.js'

try {
    // @ts-ignore
    const application = await import('socket:application')
    application.backend.open()
}catch(e) {
    console.error(e)
}


