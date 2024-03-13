// import test from './a'
import '@/a'
// import './b.scss'
// import './c.ts'

(() => {
  const d = 4
  console.log(d)
  import(/* webpackChunkName:"aaa" */'./a.js').then(res => {
    console.log(res.a)
  })
})()
