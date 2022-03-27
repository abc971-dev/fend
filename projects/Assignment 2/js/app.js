/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sectionLists = document.querySelectorAll('section');
const sectionTitles = getSectionInfo(sectionLists);
let activeSection;
const pageNav = document.getElementById('navbar__list');// get NAV ul object
let pageNavLinks = pageNav.childNodes;
let intersectionObserverEvent=[];
//let parentContainer = document.querySelector('#sectionsContainer');
let options = {root: null,rootMargin: '15px',threshold: 0.25}; // set IntersectionObserverOptions



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

addEventListener("load",setURLSectionAsActive);
addEventListener("DOMContentLoaded",setupEventTracking);
addEventListener("scroll",function(){
    let scrollEvent = intersectionObserverEvent[0];
    if(scrollEvent != null && scrollEvent.isIntersecting){
        setSectionAsActive(scrollEvent.target.parentElement.id,1);
    }
});


function setupEventTracking(e){
    createNav();
    createIntersectionObservers();
}

//TODO Finish intersection observer to identify current position in window and identify section
function createIntersectionObservers(){ 
let observer = new IntersectionObserver(function(e){
              intersectionObserverEvent=e; //record intersection observer entry
            },options);

    for (sectionList of sectionLists){
        observer.observe(sectionList.firstElementChild);
    }

}

//This function retrieves the ids and titles of each section 
function getSectionInfo(sections){
    let titleList=[];
  
  for (section of sections){
    let sectionId = section.id;
    let sectionTitle = section.firstElementChild.firstElementChild.textContent;
    titleList.push([sectionId, sectionTitle]);
  }
  
  return titleList;
}


/**
 * End Helper Functions
 * Begin Main Functions

 * 
*/

function setURLSectionAsActive(){ //If a link to a section is in the URL, it will be identified as the active section
    let adr = window.location.href;
        for(let i=0;i<sectionTitles.length;i++){
            if (adr.search(sectionTitles[i][0])!=-1){ //if the ID of a section is found in the URL
                console.log("L'URL contient la section "+sectionTitles[i][0]);
                activeSection=sectionTitles[i][0]; //The section matching the parameter is defined as the active section
                setSectionAsActive(activeSection,0);
            }
        }
}

// This function adds a link to each section from the DOM in the top navigation
    function createNav(){     
        let navList = document.createDocumentFragment(); //build the navigation menu in a document fragment to prevent reflow
               
        for (let i=0;i<sectionTitles.length;i++){
            
            let item = document.createElement('li');
            let link = document.createElement('a');
            item.appendChild(link);
            let linkId = sectionTitles[i][0];
            let linkText = sectionTitles[i][1];
            link.classList='menu__link'; // set menu link CSS class
            link.setAttribute('href','#'+linkId); //set section ID as link href
            link.setAttribute('data-nav',linkId); //set section ID as link data-nav attribute
            link.setAttribute('title',linkText); //set section title as link info
            link.innerText=linkText; // set section title as link text
            link.innerHTML+='</a>'; 
            item.innerHTML+='</li>';
            navList.appendChild(item);
        }
        pageNav.appendChild(navList);
            if(activeSection==null){
            setSectionAsActive('section1',0); // set section 1 as default active section if undefined
        }
        

        pageNav.addEventListener('click',function (e){ //add event listener to navigation menu
            if(e.target && e.target.nodeName == "A") {
               e.preventDefault(); //Prevent click from triggering direct navigation
                setSectionAsActive(e.target.getAttribute('data-nav'),0); //define section matching clicked navigation link as active section
            }
        },true)
    }


// Adds specific CSS class to the active section and scrolls it into view

function setSectionAsActive(s,eventType){//evenType 0 is a click on the nav section and eventType 1 is scrolling. The variable is used to trigger scrolling into the section
    activeSection=s;
    for (sectionList of sectionLists){ //Loop through sections
        if(sectionList.id !== activeSection){ //Validate whether current section is the active section based on function param
            sectionList.classList.remove('active'); //remove the active CSS class from the former active section
        }else{
            sectionList.classList.add('active'); //add the active CSS class to the new active section
        }
    }
    let navSection = document.getElementById(activeSection); //store active section element in variable
    if (eventType==0){ //The page will only scroll to the selected section if the function was triggered by a click in the navigation
        navSection.scrollIntoView({behavior: "smooth"},{block:"start"}); //Scroll to active section if user clicked
    }
    setNavLinkAsActive(); 
}


//Adds the active link styling to the navigation link of the active section
function setNavLinkAsActive(){
    for (pageNavLink of pageNavLinks){ //Loop through navigation menu items
        nomSection = pageNavLink.querySelector('a').getAttribute('data-nav');
        if(nomSection !== activeSection){ //Validate whether menu item link matches the active section
            pageNavLink.querySelector('a').classList.remove('active'); //remove the active CSS class from the former active navigation link
        }else{
            pageNavLink.querySelector('a').classList.add('active'); //add the active CSS class to the new active navigation link
        }
    }

}

 

