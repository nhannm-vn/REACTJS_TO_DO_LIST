import { useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../../@types/todo.type'

function Todolist() {
  //_Tạo state
  //_State chuyên lưu danh sách các todo
  const [todos, setTodos] = useState<Todo[]>([])

  //_Thằng này sẽ truyền vào component TaskInput
  //nếu là null thì mình đang ở chế độ add còn nếu khác null thì là chế độ edit
  //và ban đầu mặc định nó sẽ là null
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  //_Tạo cái biến để filter các giá trị trong todos
  //_Ở đây sẽ có 2 list dành cho hoàn thành và chưa hoàn thành
  const doneTodos = todos.filter((todo) => todo.done)
  const notdoneTodos = todos.filter((todo) => !todo.done)

  //_func giúp mình add sản phẩm vào list
  //func này sẽ nhận vào name và setState todos lại
  //nghĩa là khi bấm dấu cộng nó sẽ lấy name(value của input)
  //tạo ra object và set vào trong state
  const addTodo = (name: string) => {
    // chặn add ''
    if (name !== '') {
      const todo: Todo = {
        name,
        //lúc đầu chưa có check gì hết khi mới thêm vào nên trạng thái mặc định là false
        done: false,
        id: new Date().toISOString()
      }

      //thêm todo mới vào mảng todos bằng cách setState
      setTodos((prev) => {
        return [...prev, todo]
      })
    }
  }

  //_Method này giúp cho mình khi tick vào cái ô check
  //thì nó sẽ hiển thị trạng thái check chưa để render ra
  //nghĩa là nó sẽ set lại thuộc tính done của phần tử todo bị click
  //method này cần truyền vào id để định danh và thêm trạng thái định danh
  const handleDoneTodo = (id: string, done: boolean) => {
    setTodos((prevState) => {
      return prevState.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            done
          }
        } else {
          return todo
        }
      })
    })
  }

  //_method này giúp khi chúng ta click vào cây bút thì nó
  //sẽ biết được là đang muốn edit và thằng nào bị edit thì sẽ lưu thằng đó vào currentTodod
  //mà muốn biết và lưu thì mình cần id định danh
  const startEditTodo = (id: string) => {
    //_tìm ra thằng đó trước tiên
    const finedTodo = todos.find((todo) => todo.id === id)
    //_sau khi tìm ra thì set cho currentTodo thằng mới được tìm ra
    //_*Lưu ý ở đây nó có thể báo lỗi vì currentTodo đang có dạng là Todo | null
    //mà findedTodo thì có thể là Todo | undefinded nên mình cần as để trấn an nó hoặc cần thêm cái if
    if (finedTodo) {
      setCurrentTodo(finedTodo as Todo)
    }
  }

  return (
    <div className={styles.todolist}>
      <div className={styles.todolistContainer}>
        <TaskInput
          addTodo={addTodo} //
          currentTodo={currentTodo}
        />
        <TaskList
          doneTaskList={false} //
          todos={notdoneTodos}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
        />
        <TaskList
          doneTaskList={true} //
          todos={doneTodos}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
        />
      </div>
    </div>
  )
}

export default Todolist
