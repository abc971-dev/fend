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
const pageNav = document.getElementById('navbar__list');// get NAV ul object
let pageNavLinks = pageNav.childNodes;
let activeSection='section1'; //section 1 is defined as the active section by default
createNav();


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

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

        pageNav.addEventListener('click',function (e){ //add event listener to navigation menu
            if(e.target && e.target.nodeName == "A") {
                e.preventDefault(); //Prevent click from triggering direct navigation
                setSectionAsActive(e.target.getAttribute('data-nav')); //define section matching clicked navigation link as active section
                setNavLinkAsActive(); //define clicked navigation link as active section
            }
        })
    }


// Adds specific CSS class to the active section and scrolls it into view

function setSectionAsActive(s){
    activeSection=s;
    for (sectionList of sectionLists){ //Loop through sections
        if(sectionList.id !== activeSection){ //Validate whether current section is the active section based on function param
            sectionList.classList.remove('active'); //remove the active CSS class from the former active section
        }else{
            sectionList.classList.add('active'); //add the active CSS class to the new active section
        }
    }
    let navSection = document.getElementById(activeSection); //store active section element in variable
    navSection.scrollIntoView({behavior: "smooth"},{block:"start"}); //Scroll to active section

}

function setNavLinkAsActive(){
    for (pageNavLink of pageNavLinks){ //Loop through navigation menu items
        if(pageNavLink.querySelector('a').getAttribute('data-nav') !== activeSection){ //Validate whether menu item link matches the active section
            pageNavLink.querySelector('a').classList.remove('active'); //remove the active CSS class from the former active navigation link
        }else{
            pageNavLink.querySelector('a').classList.add('active'); //add the active CSS class to the new active navigation link
        }
    }

}

 

