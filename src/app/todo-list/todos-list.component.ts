import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { CreateTodoFormComponent } from "../create-todo-form/create-todo-form.component";
import { CreateTodo } from "../interfaces/todo-interface";
import { Store } from "@ngrx/store";
import { TodosActions } from "../users-list/store/todos.actions";
import { selectTodos, selectTodosError, selectTodosLoading } from "../users-list/store/todos.selectors";
import { Observable } from "rxjs";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todos-list.component.html',
  imports: [NgForOf, TodoCardComponent, AsyncPipe, CreateTodoFormComponent, NgIf],
  styleUrl: './todos-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodosListComponent {
  private readonly store = inject(Store);
  public readonly todos$ = this.store.select(selectTodos);
  public readonly loading$: Observable<boolean> = this.store.select(selectTodosLoading);
  public readonly error$: Observable<string | null> = this.store.select(selectTodosError);

  constructor() {
    this.store.dispatch(TodosActions.loadTodos()); // Запрос задач при создании компонента
  };

  deleteTodo(id: number) {
    this.store.dispatch(TodosActions.delete({ id }));
  };

  public createTodo(formData: CreateTodo) {
    this.store.dispatch(
      TodosActions.create({
        todo: {
        id: new Date().getTime(),
        userId: formData.userId,
        title: formData.title,
        completed: formData.completed
      }
      })
    );
  }
}
