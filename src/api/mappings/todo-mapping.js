const ToDoModelToGraphType = ({ _id, text, completed }) => ({
  itemId: _id,
  text,
  completed,
})

export default ToDoModelToGraphType
