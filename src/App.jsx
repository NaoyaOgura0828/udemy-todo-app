import React from 'react';
import { useState } from 'react';
import './styles.css';


export const App = () => {
  const [todoText, setTodoText] = useState('');
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value); // onChangeに設定する関数

  // 入力されたTODOを未完了のTODOリストに格納する
  const onClickAdd = () => {
    if (todoText === '') return; // もしも入力値が空文字だった場合は何も実行しない
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos); // 未完了のTODOを更新する
    setTodoText(''); // 入力された値をリセットする
  }

  // 削除ボタンが押された時の動作
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos]; // 未完了のTODOの配列をコピーする
    newTodos.splice(index, 1) // 未完了のTODOリストから削除する
    setIncompleteTodos(newTodos); // 未完了のTODOを更新する
  }

  // 完了ボタンが押された時の動作
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos] // 未完了のTODOの配列をコピーする
    newIncompleteTodos.splice(index, 1) // 未完了のTODOリストから削除する

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]]; // 削除されたindexの要素から新しい完了配列を生成する
    setIncompleteTodos(newIncompleteTodos); // 未完了のTODOを更新する
    setCompleteTodos(newCompleteTodos); // 完了のTODOを更新する
  }

  // 戻すボタンが押された時の動作
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos] // 完了のTODOの配列をコピーする
    newCompleteTodos.splice(index, 1) // 完了のTODOリストから削除する

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]]; // 削除されたindexの要素から新しい未完了配列を生成する
    setCompleteTodos(newCompleteTodos); // 完了のTODOを更新する
    setIncompleteTodos(newIncompleteTodos); // 未完了のTODOを更新する
  }

  return (
    <>
      <div className='input-area'>
        <input placeholder='TODOを入力' value={todoText} onChange={onChangeTodoText} />
        <button onClick={onClickAdd} >追加</button>
      </div>
      <div className='incomplete-area'>
        <p className='title'>未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, index) => {
            return (
              <div key={todo} className='list-row'>
                <li>{todo}</li>
                <button onClick={() => onClickComplete(index)}>完了</button> {/* onClickCompleteに引数を渡す */}
                <button onClick={() => onClickDelete(index)}>削除</button> {/* onClickDeleteに引数を渡す */}
              </div>
            );
          })}
        </ul>
      </div>
      <div className='complete-area'>
        <p className='title'>完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className='list-row'>
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button> {/* onClickBackに引数を渡す */}
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}
