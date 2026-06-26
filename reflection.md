#1: I had assumed that getToDoList returns a copy of the toDoList but is not bound to the real toDoList, and concluded that it's not possible to call todoTask methods to edit their properties
=> why is that wrong?
=> This is the power of closure: after createProject finishes executing, it returns getToDoList
=> since getToDoList still refers to toDoList, that's why toDoList is not deleted from memory
=> when we call getToDoList, it is actually referring to the real toDoList

#2: Critical questions for the removeToDo method inside createProject:
"    const removeToDo = (taskTitle) => {
        for(let i = 0; i < toDoList.length; i++) {
            if( toDoList[i].getTitle() === taskTitle ){
                toDoList.splice(i, 1);
            }
        }
    }"

- the loop can stop early as soon as it finds the correct toDo (solved)
- it is not stable since two todos can have the same title (solved)
=> need something to indicate uniqueness
=> recall of a familiar pattern: imagine the user clicks a todo task to delete; that element in HTML
will have a data-id attribute. We retrieve this id and use it as the identifier whenever
we want to target that specific todo task
=> to generate the id: use crypto.uuid() (this is from the library project)
=> we attach one unique id to one toDoTask
=> structure: toDoList = [
    { id: 'uuid1', getTitle, getDesc, ... },
    { id: 'uuid2', getTitle, getDesc, ... },
    ...
]

#3: WHY projectStorage is just an IIFE/single module object but NOT a FACTORY
- big reason: only EXACTLY one storage is needed to manage ALL the projects
=> no need to create many instances => goes against the main use of a FACTORY

#4: Recognize how the approach to removeProject can be made by reusing the pattern in
how toDos are removed in "#2". Small difference: the project generates the uuid and
adds it as its own property.

#5: realize that by default, we never need to pass in the status of a toDo because it's always not done yet
=> we only need the status when loading an existing todo

#6: there are some common ways to insert a block of HTML into an element using JavaScript
=> most popular is to use innerHTML. Can assign a block of HTML to innerHTML (replace), or add to innerHTML
=> the problem with adding to innerHTML (innerHTML += ) is that it destroys all the content inside the element, then recreates it
with the new block of HTML added
=> so be aware of a new method called insertAdjacentHTML. This helps solve the problem; it appends directly after the last child

#7: Learn more DOM methods: matches(), closest(selector)
- matches() is just to check if the element is actually the element we're targeting in the DOM
- closest() is like querySelector()
=> main difference is, querySelector() searches downward into the element's children while closest() searches upwards from that element
into the element's ancestors (parents)

#8: event.target is sometimes not exactly the element that we attached the event listener to
=> it can also be the children of that element
=> the element is just the place where we attach the listener, not the only element that gets the event

=> Combined (#8 + #9): that's why for chevron + project item clicks. We want to click these, but since they are big items, clicking anywhere inside the chevron and project item, or on them, will count as clicking the chevron and project item

#9: EVENT DELEGATION (beauty)
=> the explorer body is a static element, it's always there. Instead of attaching separate event listeners
to each of the project items
=> we can just attach the event listener to their parent (explorerBody)
=> this way we ensure that any newly created project-item has an event listener

=> BIG LESSON: if there are too many elements that I want to add listeners to but they are under 1 parent container, this is the sign to use event delegation,
which is to attach the listener once to the parent and then use closest() to search upwards for the target
=> this avoids having so many lines of code just to attach separate listeners to each sub-element

=> need to research more on how closest() actually works, and what it returns

#10: classList doesn't just have add and remove. It also has contains() to check if a class is inside the classList

=> Overall, what can I know about functions that can help this much (to serve my purpose => how would I google it?)

#11: apart from targeting elements based on classes or ids, we can target based on attributes

#12: WHY the adding-todo modal only asks for the name
e.g: let's say you're in a hurry for shopping, you quickly add tasks so you don't forget. You just need the title of the tasks only. Their other properties can be edited later

#13: WHY adding 'return' in the (check if chevron is clicked) condition block
=> because it won't check the condition if the project header is clicked
(the chevron is inside the project header, so if the chevron condition is satisfied, that means the project header also got clicked)

#14: (THIS ONE IS IMPORTANT, MIGHT BE THE ANSWER TO MANY PREVIOUS QUESTIONS)
- In event delegation, the event.target will not always be the parent element
=> it will be the child element that is clicked

#15: THE BIG ADVANTAGE OF EVENT DELEGATION IS THAT if we have many elements with the same class,
we don't need to query all of them for listeners. Whichever is clicked will be the event.target (only that element)

#16: the input checkbox is built to be checked and unchecked both visually and logically; it will change its return value. No need to write JavaScript to manually toggle that boolean value.

#17: using 2 class attributes for an element is different from putting 2 classes under 1 class attribute ""
if you use class="abc" class="bcd" => bcd will overwrite everything
if you want to include both, you must use class="abc bcd"
