$('h1').hide().fadeIn(1000);
function addUIItem(txt) {
    let li = $('<li>').text(txt); // Luo uusi li-elementti annetulla tekstillä
    list.prepend(li); // Liitä uusi li-elementti luetteloon
  
    const delBtn = $('<button>').text('tehty'); // luo poistopainike
    li.append(delBtn); // Liitä poistopainike li-elementtiin
  
    delBtn.on('click', function() { // Lisää klikkaustapahtuman kuuntelija poistopainikkeeseen
        li.slideUp(200, function() { // Liu'uta li-elementti ylös
          $(this).remove(); //Irrota li-elementti DOM:sta ylös liukumisen jälkeen
        });
        savedTasks = savedTasks.filter(function(task) {
          return task !== txt;
        });
      localStorage.setItem('tasks', JSON.stringify(savedTasks));
    });
  }
  
  let input = $('#todo') ; // Valitse syöttöelementti
  let btn = $('#btn'); // Valitse painikeelementti
  let list = $('#list'); // Valitse listaelementti
  
  let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(addUIItem);
  
  btn.on('click', function() { //Lisää napsautustapahtuman kuuntelija painikkeeseen
    let txt = input.val();
    if (txt === '') {
      alert('Sinun piti kirjoittaa jotain!');
    } else {
      savedTasks.push(txt);
      localStorage.setItem('tasks', JSON.stringify(savedTasks));
      input.val('');
      addUIItem(txt);
      
      // Napin feidaus efekti
      btn.fadeOut(500, function() {
        $(this).fadeIn(500);
      });
    }
  });
  
  list.on('click', 'li', function(e) {
    $(e.target).toggleClass('checked');

  });
  
  list.addEventListener("click", (e) => { //tehtävien checkaus, ccs tiedosto muuttaa tyylin
    if (e.target.tagName == "LI") {
      e.target.classList.toggle("checked");
    }
  });
  