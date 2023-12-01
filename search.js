// Imported keywords from other files
import { terms } from './terms-keywords.js';
import { templates } from './templates-keywords.js';
import { graphics } from './graphics-keywords.js';
import { colors } from './colors-keywords.js';
import { branding } from './branding-keywords.js';
import { typography } from './typography-keywords.js';
import { logo } from './logo-keywords.js';

// NOTE: Imported files are not accessible inside incapsulation.
var searchComponent = (function(){

    //Open search UI
    $('#search-btn').click(function(){
        $('.overlay-search').toggle();
        $('#search-btn').toggleClass('toggle-search-clear'); // Need Sheila's help with this
        $('#search-btn span').toggleClass('float-lg-none icon-sm fa fa-search');
        $('.search-container').toggleClass('show-search-container');
    });

    $('.overlay-search').click(function(){
        $(this).hide();
        $('.search-container').removeClass('show-search-container');
        $('#search-btn').toggleClass('toggle-search-clear'); // Need Sheila's help with this
        $('#search-btn span').toggleClass('float-lg-none icon-sm fa fa-search');
    });
    // /search UI


    var result = [];
    var answers = '';
    var userInput =''; 

    // Search function
    $("#search").on("keyup change", function(e) {
        if(e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 13){
            generateResults();
        }
        if(e.keyCode == 13){
            // goToPage();
            highlightSearchResult();
        }
    })

    // If user clicks search icon
    $('#searchField-icon-btn').click(function(){
        goToPage();
    });

    // Loop through external keyword arrays and push results to result array
    function generateResults(){
        result = [];
        userInput = $('#search').text().toLowerCase();

        // If search input field is not empty
        if(userInput.length >= 1 ){

            // Square botom corners of search input field
            $('.search-container').addClass('search-container-squared-bottom');

            // Show results popup box
            $(".resultBox").addClass('show-resultBox');

            //show clear button
            $('.clear-search-field-btn').addClass('show-clear-search-field-btn');

            // **Terms keywords 
            for(var i = 0; i < terms.length; i++){
                if (terms[i].startsWith(userInput)) {
                    result.push(terms[i] + "<span class='ghost'> - terms page</span>");
                } 
            };

            // **Colors keywords 
            for(var i = 0; i < colors.length; i++){
                if (colors[i].startsWith(userInput)) {
                    result.push(colors[i] + "<span class='ghost'> - colors page</span>");
                } 
            };

            // **Templates keywords 
            for(var i = 0; i < templates.length; i++){
                if (templates[i].startsWith(userInput)) {
                    result.push(templates[i] + "<span class='ghost'> - templates page</span>");
                } 
            };

            // **Graphics keywords 
            for(var i = 0; i < graphics.length; i++){
                if (graphics[i].startsWith(userInput)) {
                    result.push(graphics[i] + "<span class='ghost'> - graphics page</span>");
                } 
            };

            // **Branding keywords 
            for(var i = 0; i < branding.length; i++){
                if (branding[i].startsWith(userInput)) {
                    result.push(branding[i] + "<span class='ghost'> - branding page</span>");
                } 
            };
            
            // **Logo keywords
            for(var i = 0; i < logo.length; i++){
                if (logo[i].startsWith(userInput)) {
                    result.push(logo[i] + "<span class='ghost'> - logo page</span>");
                } 
            };

            // **Typography keywords
            for(var i = 0; i < typography.length; i++){
                if (typography[i].startsWith(userInput)) {
                    result.push(typography[i] + "<span class='ghost'> - typography page</span>");
                } 
            };

            // Clear answers after each keyup
            answers = ''; 

            // remove duplicates from result array
            result = result.filter(function(item, pos) {
                return result.indexOf(item) == pos;
            })

            // Display results
            for (let i = 0; i < result.length; i++) {

           // Upper case first letter of first word in result
            var firstLetter = result[i].charAt(0).toUpperCase();
            var restOfWord = result[i].slice(1);
            result[i] = firstLetter + restOfWord;

                // Add results to answers variable
                answers += "<li class='result"+[i]+"'><span tabindex='0'>" + result[i]+" </span></li>";  
            } 
                $(".resultBox").html(answers);
                getList();
        }else{
            // Clear result popup box if search input field is empty
            $(".resultBox").html('');
            $("#search").text('');
            $('.clear-search-field-btn').removeClass('show-clear-search-field-btn');
            $(".resultBox").removeClass('show-resultBox');
            $('.search-container').removeClass('search-container-squared-bottom');
        }
        // If no results found
        if(result.length == 0 && userInput.length >= 1){
            $(".resultBox").html('<li class="noResult">No results found</li>');
        }
    };

    // Clear results when clicking outside of search box
    $(document).click(function(e) {
        if (e.target.id !== 'search') {
            $(".resultBox").html('').removeClass('show-resultBox');
            $('.search-container').removeClass('search-container-squared-bottom');
        }
    });

    // Clear results if user clicks on clear button
    $('.clear-search-field-btn').click(function(){
        $(".resultBox").html('');
        $("#search").text('').html('');
        $('.clear-search-field-btn').removeClass('show-clear-search-field-btn');
        $(".resultBox").removeClass('show-resultBox');
        $('.search-container').removeClass('search-container-squared-bottom');
    });

    // Navigating ul li with up and down arrow keys
    function getList(){
        var li = $(".resultBox li");
        var liLength = li.length;
        var liIndex = -1;
        var liSelected;
        var liSelectedText;
        var liSelectedLink;
        var liSelectedLinkText;

        $(document).keydown(function(e) {
            // Down key
            if (e.keyCode == 40) { 
                if (liIndex + 1 < liLength) {
                    liIndex++;
                    liSelected = li.eq(liIndex);
                    liSelectedText = liSelected.html();
                    liSelectedLink = liSelected.find('span');
                    liSelectedLinkText = liSelectedLink.text();
                    liSelected.addClass('selected').siblings().removeClass('selected');
                    $('#search').html(liSelectedText); 
                }
            }
            // Up key 
            else if (e.keyCode == 38) { 
                if (liIndex > 0) {
                    liIndex--;
                    liSelected = li.eq(liIndex);
                    liSelectedText = liSelected.html();
                    liSelectedLink = liSelected.find('span');
                    liSelectedLinkText = liSelectedLink.text();
                    liSelected.addClass('selected').siblings().removeClass('selected');
                    $('#search').html(liSelectedText);
                }
            }
            // Enter key. Not sure about this one
            // else if (e.keyCode == 13) {
            //     liSelectedLink.click();
            // }
        });
    }

    function goToPage(){
        var pageRef = $('#search').find('.ghost').text();
        var keyWord = $('#search').text();
        // Remove ghost text from keyword. Remove space at the end of string. Make lower case.
        keyWord = keyWord.replace(pageRef, '').replace(/\s+$/, '').toLowerCase();
        
        switch(pageRef) {
            case ' - branding page':
                window.location.href = 'https://cnn.com/?keyword=branding';
              break;
            case ' - logo page':
                window.location.href = 'https://msnbc.com/?keyword=branding';
              break;
            case ' - typography page':
                window.location.href = 'https://foxnews.com/?keyword=branding';
              break;
            case ' - colors page':
                window.location.href = 'https://foxnews.com/?keyword=branding';
            break;
            case ' - terms page':
                window.location.href = 'https://foxnews.com/?keyword=branding';
            break;
            case ' - graphics page':
                window.location.href = 'https://foxnews.com/?keyword=branding';
            break;
            case ' - templates page':
                window.location.href = 'https://foxnews.com/?keyword=branding';
            break;                                       
          }
    };
    // If user clicks on result
    $(document).on('click', '.resultBox li', function(){
        var thisResult = $(this).html();
        $('#search').html(thisResult);
    });

    // Highlight search results
    let params = new URL(document.location).searchParams;
    let input = params.get("search"); 

    var text;
    var para = document.querySelectorAll('p');
        para = [...para];
        para.forEach(item => {
            text = item.innerHTML;
            text = text.indexOf(input);
            if(text >= 0){
                item.innerHTML = item.innerHTML.replaceAll(input, '<span class="highlight">'+input+'</span>');
            }
        });


})();