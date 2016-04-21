//read words from a given file
function readWords(path){
    var wordList;
        
    $.ajax({
        url: path,
        async: false,
        dataType: "text"
    }).done(function(data) {
        wordList = data.split('\n');
    });
    
    return wordList;
}

//concatenates the object fields into a string separated by commas
function wordToText(words){
    var text="";
    for(var i in words){
        text = text+ words[i].word+","+words[i].width+","+words[i].length+"<br>";
    }    
    return text;
}

//returns word size of rendered word in a given fontSize in pixels 
//needs to have a invisible span called testArea
function getWordSize(word, fontSize) {
    $("#testArea").css("font-size", fontSize);
    var span = document.getElementById("testArea");
    span.innerHTML = word;    
    return(span.offsetWidth)
}


//selects a list of words considering word length and regex
function selectListWords(wordList, hasnt, minLen, maxLen, fontSize){
    
    var pattern = new RegExp("^[^"+hasnt+"]+$");
    var str = "", count=0, result=[];
    for (var index in wordList){
        var word = wordList[index];
        if (pattern.test(word)){ //tests in word doesnt have set of charcter            
            if((word.length>=minLen) && (word.length<=maxLen)){ // tests length of the word
                word = word.trim();
                str += word+","+getWordSize(word)+","+word.length+"<br>"
                count++;
                result.push({word:word, width:getWordSize(word), length:word.length});
            }            
        }
    }    
    return result;
}


//generates an unique random number
function getUniqueRandom(hashMap, max){
    var rdm;
    do{
        rdm = Math.floor(Math.random()*max);
        if(!hashMap[rdm]){
            hashMap[rdm] = true;
            return rdm;
        }
    }while(true);    
}

//selects pool of words considering its width
function selectPoolWidth(wordList, nWords, minWidth, maxWidth){
    var result = [], hashMap=[], randomIndex, count=0;
    while (result.length<nWords && count<wordList.length){
        randomIndex = getUniqueRandom(hashMap, wordList.length);
        if(wordList[randomIndex].width>=minWidth && wordList[randomIndex].width<=maxWidth){
            result.push(wordList[randomIndex]);
        }
        count++;
    }
    
    return result;    
}

//selects pool of words considering its length
function selectPoolLength(wordList, nWords, minLength, maxLength){
    var result = [], hashMap=[], randomIndex, count=0;
    
    while (result.length<nWords && count<wordList.length){
        randomIndex = getUniqueRandom(hashMap, wordList.length);
        if(wordList[randomIndex].length>=minLength && wordList[randomIndex].length<=maxLength){
            result.push(wordList[randomIndex]);
        }
        count++;
    }
    
    return result;    
}

//selects pool of words considering its width AND length
function selectPoolWidthLength(wordList, nWords, minWidth, maxWidth, minLength, maxLength){
    var result = [], hashMap=[], randomIndex, count=0;
    while (result.length<nWords && count<wordList.length){
        randomIndex = getUniqueRandom(hashMap, wordList.length);
        if((wordList[randomIndex].width>=minWidth && wordList[randomIndex].width<=maxWidth) && (wordList[randomIndex].length>=minLength && wordList[randomIndex].length<=maxLength)){
            result.push(wordList[randomIndex]);
        }
        count++;
    }
    
    return result;    
}