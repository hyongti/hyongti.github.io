TODO: 블로그로 이동
[번역] Riverpod, StateNotifier, Freezed, DDD를 이용한 Flutter 상태 관리

원문: [State Management in Flutter Using Riverpod, StateNotifier, Freezed, and DDD](https://medium.com/better-programming/riverpod-statenotifier-freezed-ddd-combination-to-manage-the-state-powerfully-in-flutter-e674ba7e932c)

![image](https://github.com/hyongti/hyongti.github.io/assets/68804133/f7ae21bf-091f-4265-a0a5-67d668f7dc77)

> *참고: 시작하기 전에 이 프로젝트의 링크를 보고 싶다면, [이곳](https://github.com/alper-efe-sahin/todo_riverpod_ddd_freezed_statenotifier)에 들어가시면 됩니다. 제 채널에 이 프로젝트에 대한 [영상](https://youtu.be/wtw_5d7VWmQ)도 있습니다.*

안녕하세요 여러분! 이 글에서 우리는 Riverpod + StateNotifier + Freezed + Domain Driven Design(DDD)를 사용해서 투두 앱을 만들 거에요. 이 글에 관련된 영상도 만들었으니 글을 읽거나, 영상을 보시거나, 둘 다 하셔도 됩니다!

우선, 이 글에서는 모든 걸 설명하진 않을 거에요. 영상이 있기 때문이죠. 아키텍쳐를 만들고, 아키텍쳐 안에서 어떻게 Riverpod을 사용하는지 알려들리 거에요.

이제 시작해볼까요?

## Todo App

제가 투두 앱을 만드는 이유는 간단하기 때문이에요. 카운터 앱을 만들긴 싫었어요, 카운터 앱도 간단하기 하지만 너어어무 많아서 더 이상 들여다보기가 싫기 때문입니다. 그래서 투두 앱을 만드려구요.

제 깃헙에 `rickandmortyapi`라는 컨텐츠가 하나 더 있는데, 이것도 Riverpod + StateNotifier + Freezed + Domain Driven Design(DDD)와 관련된 컨텐츠에요. 이거에 대해서도 글과 비디오를 만들 예정인데, Riverpod을 파악하기 위해서는 이 투두 앱이 중요해요.

---

먼저, 아키텍쳐(폴더 구조)를 보겠습니다.

![image](https://github.com/hyongti/hyongti.github.io/assets/68804133/e3f9e07e-517d-4db3-898d-25f793775808)

사진을 보시면, application 폴더가 있습니다. application 폴더는 비즈니스 로직을 위한 폴더입니다. domain, presentation, 그리고 여기엔 없지만 아마도 infrastructure가 있을 거에요. <b>[이 글](https://medium.com/@alperefesahin/bloc-pattern-for-login-bloc-login-in-flutter-551fd05beb99)</b>의 file structure 파트에 잘 설명하고 있습니다.

다음으로 위젯(기본적인 UI)를 만든 후에 진짜 질문으로 넘어갈 수 있습니다.

> 어떻게 Riverpod + StateNotifier + Freezed + DDD를 동시에 사용할 수 있을까

참고: 이 프로젝트에서 사용하는 패키지들은 다음과 같습니다

```yaml
dependencies:
  flutter:
    sdk: flutter
  freezed_annotation: ^2.0.3
  flutter_riverpod: ^1.0.4
  uuid: ^3.0.6
  sizer: ^2.0.15
  
  
dev_dependencies:
  flutter_test:
    sdk: flutter
  freezed: ^2.0.3+1
  build_runner: ^2.1.11
```

우선, domain 폴더를 만들겠습니다. 여기에는 몇가지 모델이 있습니다.

```dart
// domain/todo_model.dart
import 'package:freezed_annotation/freezed_annotation.dart';

part 'todo_model.freezed.dart';

@freezed
class TodoModel with _$TodoModel {
  const factory TodoModel({
    required String id,
    required String title,
    required bool isTodoCompleted,
  }) = _TodoModel;

  const TodoModel._();

  factory TodoModel.empty() => const TodoModel(
        id: "",
        title: "",
        isTodoCompleted: false,
      );
}
```

모델을 만든 다음, 아래 명령어를 실행해야 해요.

```sh
flutter packages pub run build_runner build — delete-conflicting-outputs
```

명령어를 실행하고 나면 에러가 사라질 거에요.

다음으로는, application 폴더로 가보겠습니다.

이 아키텍쳐를 적용하려면, 일단 state 파일을 만드는 걸로 시작하는 게 좋습니다. 그래야 덜 혼란스러울 거에요.(이건 그냥 제안일 뿐입니다.)

application 폴더 안에 `todo_state.dart`라는 파일을 만들겠습니다.

```dart
// application/todo_state.dart
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:todo_list_riverpod/domain/todo_model.dart';

part 'todo_state.freezed.dart';

@freezed
class TodoState with _$TodoState {
  factory TodoState({
    required List<TodoModel> todoList,
    required TodoModel todo,
  }) = _TodoState;

  const TodoState._();

  factory TodoState.empty() => TodoState(
        todoList: [],
        todo: TodoModel.empty(),
      );
}
```

`todo_state.dart`를 만들었다면, 다음으로는 `todo_event.dart`라는 파일을 만들겠습니다.

```dart
// application/todo_event.dart
import 'package:freezed_annotation/freezed_annotation.dart';

part 'todo_event.freezed.dart';

@freezed
class TodoEvent with _$TodoEvent {
  const factory TodoEvent.todoTitleChanged({required String text}) = TodoTitleChanged;
  const factory TodoEvent.todoStatusChanged({required String todoId}) = TodoStatusChanged;
  const factory TodoEvent.addTodo() = AddTodo;
  const factory TodoEvent.removeTodo({required String todoId}) = RemoveTodo;
}
```

`todo_state.dart`, `todo_event.dart`를 모두 만들었다면, 아래 명령어를 한번 더 실행합니다.

```sh
flutter packages pub run build_runner build — delete-conflicting-outputs
```

에러가 사라질 거에요.

마지막으로 state notifier를 만들 차례입니다. state의 이름이 todo였으므로, notifier도 `TodoNotifier`라는 이름으로 만들겠습니다.

```dart
// application/todo_notifier.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:todo_list_riverpod/application/todo/todo_event.dart';
import 'package:todo_list_riverpod/application/todo/todo_state.dart';
import 'package:todo_list_riverpod/domain/todo_model.dart';
import 'package:uuid/uuid.dart';

class TodoNotifier extends StateNotifier<TodoState> {
  TodoNotifier() : super(TodoState.empty());

  final uuid = const Uuid();

  mapEventsToStates(TodoEvent event) async {
    return event.map(
      todoTitleChanged: (todoTitleChangedEvent) {
        state = state.copyWith(
          todo: TodoModel(
            id: state.todo.id,
            title: todoTitleChangedEvent.text.trimLeft(),
            isTodoCompleted: false,
          ),
        );
      },
      todoStatusChanged: (todoStatusChangedEvent) {
        final selectedTodo = state.todoList.where((element) => element.id == todoStatusChangedEvent.todoId).single;
        final todolist = [...state.todoList];

        todolist[todolist.indexWhere((element) => element.id == selectedTodo.id)] =
            TodoModel(id: selectedTodo.id, title: selectedTodo.title, isTodoCompleted: !selectedTodo.isTodoCompleted);

        state = state.copyWith(todoList: todolist);
      },
      addTodo: (addTodoEvent) {
        final List<TodoModel> todoList = [...state.todoList];
        todoList.add(
          TodoModel(
            id: uuid.v1(),
            title: state.todo.title,
            isTodoCompleted: false,
          ),
        );
        state = state.copyWith(todoList: todoList);
      },
      removeTodo: (removeTodoEvent) {
        final List<TodoModel> todoList = [...state.todoList];
        final todoId = removeTodoEvent.todoId;

        todoList.removeWhere((element) => element.id == todoId);

        state = state.copyWith(todoList: todoList);
      },
    );
  }
}
```

이번에는 build runner 뭐시기 하는 명령어를 실행하지 않을 거에요. 이번에는 필요가 없습니다.

이제 우리는 notifier, state, events, model을 가지고 있습니다. 이번엔 `provider`를 만들거에요. 우리는 state, events 등등에 `Provider`를 통해 접근할 겁니다. 

provider 폴더 안에 `todo_provider.dart`라는 파일을 만들겠습니다.

```dart
// provider/todo_provider.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:todo_list_riverpod/application/todo/todo_notifier.dart';
import 'package:todo_list_riverpod/application/todo/todo_state.dart';

final todoNotifierProvider = StateNotifierProvider<TodoNotifier, TodoState>(
  (ref) {
    return TodoNotifier();
  },
);
```

`StateNotifierProvider`를 사용하는 이유는, 우리가 notifier, state에 접근하기 위함입니다. 그래서 `TodoNotifier`와 `TodoState`를 가지고 `StateNotifierProvider`를 생성한 거에요. 코드에서 보실 수 있듯이 `TodoNotifier()`를 반환합니다.

---

마지막으로 해야할 일은, state를 호출하고, event를 보내고, provider를 사용하는 겁니다!

`main.dart` 파일로 이동해볼까요?

`Riverpod` 트리를 사용하고 싶다면, 모든 것을 `ProviderScope()`로 감싸야 합니다.

```dart
// main.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:todo_list_riverpod/presentation/core/app_widget.dart';

void main() {
  runApp(
    const ProviderScope(
      child: AppWidget(),
    ),
  );
}
```

다음으로, presiontation 폴더로 이동해보겠습니다.

core 폴더 안에 app_widget이 여기에 있을 겁니다.

```dart
// presentation/core/app_widget.dart
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';
import 'package:todo_list_riverpod/presentation/pages/home_page/home_page.dart';

class AppWidget extends StatelessWidget {
  const AppWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Sizer(
      builder: (context, orientation, deviceType) {
        return Listener(
          onPointerUp: (_) {
            if (Platform.isIOS) {
              FocusScopeNode currentFocus = FocusScope.of(context);
              if (!currentFocus.hasPrimaryFocus && currentFocus.focusedChild != null) {
                FocusManager.instance.primaryFocus!.unfocus();
              }
            }
          },
          child: const MaterialApp(
            debugShowCheckedModeBanner: false,
            home: HomePage(),
          ),
        );
      },
    );
  }
}
```

필요한 파일들을 제대로 import하는 걸 잊지 마세요!

home_page도 있어야 해요.

```dart
// presentation/home_page.dart
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final todoList = ref.watch(todoNotifierProvider.select((state) => state.todoList));
    final reversedTodoList = List<TodoModel>.from(todoList.reversed);
    .
    .
    .
```

코드를 보시면 `final todoList`라는 변수가 있습니다. 우리는 `STATE`(`METHOD`가 아닙니다!)를 가져오기 위해 `ref.watch` 메서드를 사용할 거에요. method, function을 가지고 있는 notifier에 접근하려면, `yourProvider.notifier`를 사용해야 하지만, 단순히 state에 접근할며녀 `ref.watch(yourProvider)`를 사용하시면 됩니다. 가끔은 메서드를 선택하는 게 유용하기도 합니다.

예를 들어, 모든 state가 아니라 `todoList`만을 보길 원한다면, `select` 메서드를 사용할 수 있습니다.

`home_page.dart` 파일 안에는 `TodosActionpart`, `TodosPart` 섹션과 같은 다른 파트도 있습니다. ([코드](https://github.com/alperefesahin/todo_riverpod_ddd_freezed_statenotifier/blob/main/lib/presentation/pages/home_page/home_page.dart))

`TodosActionPart` 위젯을 보면 `Button`과 `Textfield`를 사용하고 있습니다. textfield에서는 `onChanged`를 사용하지 않고, `TextfieldController`를 사용해 문자열을 보관합니다.

```dart
// presentation/widgets/todos_action_part.dart
...
 onPressed: () {
            ref.read(todoNotifierProvider.notifier).mapEventsToStates(
                  TodoTitleChanged(text: textfieldController.value.text),
                );
            ref.read(todoNotifierProvider.notifier).mapEventsToStates(
                  const AddTodo(),
                );
            textfieldController.clear();
          },
...
```

Riverpod을 사용할 때, `onTap`을 사용하든 `onClick`을 사용하든 별로 중요하지 않습니다. `watch`만 사용하지 마세요. 우리는 아무것도 리스닝하지 않고, 단지 버튼만 클릭하면 됩니다. 자세한 내용은 `riverpod.dev`를 확인하세요.

우리는 notifier에 접근하기 위해 `provider.notifier`를 사용합니다. 그런 다음, `mapEventsToState`를 호출합니다. 먼저 `TodoTitleChanged` 이벤트를 등록하고, `AddTodo` 이벤트를 등록합니다.

`todos_part.dart` 파일에 대해서도 같은 작업을 수행합니다!

![image](https://github.com/hyongti/hyongti.github.io/assets/68804133/8beb6242-147a-4fa1-9f76-908b9ed61c81)

이게 전부입니다! 그리고 [여기](https://github.com/alperefesahin?tab=repositories)에서 Riverpod을 사용해 만든 앱들을 한눈에 확인하실 수 있습니다.

읽어주셔서 감사합니다! 계속 지켜봐주세요!!



