import test from './a'
import './a.css'
import './b.scss'
import './c.ts'

(() => {
  const d = 4
  console.log(d)
  console.log(test.a)
})()
