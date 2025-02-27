import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {TodosApiService} from "../todos-api.service";
import {AsyncPipe, NgForOf} from "@angular/common";
import {TodoCardComponent} from "./todo-card/todo-card.component";
import {CreateTodoFormComponent} from "../create-todo-form/create-todo-form.component";
import {CreateTodo, Todo} from "../interfaces/todo-interface";
import {Store} from "@ngrx/store";
import {TodosActions} from "../users-list/store/todos.actions";
import {selectTodos, selectTodosFeature} from "../users-list/store/todos.selectors";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todos-list.component.html',
  imports: [NgForOf, TodoCardComponent, AsyncPipe, CreateTodoFormComponent],
  styleUrl: './todos-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodosListComponent {
  readonly todosApiService = inject(TodosApiService)
  private readonly store = inject(Store);
  public readonly todos$ = this.store.select(selectTodos);

  constructor() {
    this.todosApiService.getTodos().subscribe(
      (response: Todo[])=> {
        this.store.dispatch(TodosActions.set({ todo: response }));
      }
    )
  }

  deleteTodo(id: number) {
    this.store.dispatch(TodosActions.delete({ id }));
  }

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
