window.onload = function() {
    initDragElement();
    initResizeElement();
  };
  
/* Function for dragging an element */
function initDragElement() {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    var drags = document.getElementsByClassName("drag");
    var elmnt = null;
    var currentZIndex = 100;
  
    for (var i = 0; i < drags.length; i++) {
      var drag = drags[i];
      var header = getHeader(drag);
  
      drag.onmousedown = function() {
        this.style.zIndex = "" + ++currentZIndex;
      };
  
      if (header) {
        header.parentDrag = drag;
        header.onmousedown = dragMouseDown;
      }
    }
    // function for holding the mouse down on the element.
    function dragMouseDown(e) {
      elmnt = this.parentDrag;
      elmnt.style.zIndex = "" + ++currentZIndex;
  
      e = e || window.event;
      // gets the mouse cursor position as soon as the page loads
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // calls a function when the cursor moves
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      if (!elmnt) {
        return;
      }
  
      e = e || window.event;
      // calculates the cursors new position
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // sets the elements new position
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }
  
    function closeDragElement() {
      /* stops moving the element after the mouse button is released*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  
    function getHeader(element) {
      var headerItems = element.getElementsByClassName("draggable-header");
  
      if (headerItems.length === 1) {
        return headerItems[0];
      }
  
      return null;
    }
  }
  // function dealing with resizing an element
  function initResizeElement() {
    var drags = document.getElementsByClassName("drag");
    var element = null;
    var startX, startY, startWidth, startHeight;
  
    for (var i = 0; i < drags.length; i++) {
      var p = drags[i];
  
      var right = document.createElement("div");
      right.className = "resizer-right";
      p.appendChild(right);
      right.addEventListener("mousedown", initDrag, false);
      right.parentDrag = p;
  
      var bottom = document.createElement("div");
      bottom.className = "resizer-bottom";
      p.appendChild(bottom);
      bottom.addEventListener("mousedown", initDrag, false);
      bottom.parentDrag = p;
  
      var both = document.createElement("div");
      both.className = "resizer-both";
      p.appendChild(both);
      both.addEventListener("mousedown", initDrag, false);
      both.parentDrag = p;
    }
  
    function initDrag(e) {
      element = this.parentDrag;
  
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(
        document.defaultView.getComputedStyle(element).width,
        10
      );
      startHeight = parseInt(
        document.defaultView.getComputedStyle(element).height,
        10
      );
      document.documentElement.addEventListener("mousemove", doDrag, false);
      document.documentElement.addEventListener("mouseup", stopDrag, false);
    }
  
    function doDrag(e) {
      element.style.width = startWidth + e.clientX - startX + "px";
      element.style.height = startHeight + e.clientY - startY + "px";
    }
  
    function stopDrag() {
      document.documentElement.removeEventListener("mousemove", doDrag, false);
      document.documentElement.removeEventListener("mouseup", stopDrag, false);
    }
  }