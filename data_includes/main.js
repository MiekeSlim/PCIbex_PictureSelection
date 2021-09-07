PennController.ResetPrefix(null);
PennController.SetCounter("Counter")
PennController.DebugOff()
PennController.AddHost("https://users.ugent.be/~mslim/PictureSelection/");

PennController.Sequence("welcome", "Counter", "trials", "prequestionnaire", "questionnairepage", "send", "exit")

// Welcome, consent, and creditstuff
// Instructions
    PennController("welcome",
        newText("WelcomeText", "<p>Welkom en bedankt dat je deelneemt aan deze survey! In deze korte survey zal je  zinnetjes lezen. In deze zinnen staat beschreven wat een mens of dier, of een groep mensen of dieren, aan het doen is. </p> <p> Onder elke zin staan vier afbeeldingen. Het is aan jou de taak om twee afbeeldingen te kiezen die bij de zin passen, zodat de actie die in de zin wordt beschreven wordt uitgevoerd. </p> <p> Deze twee afbeeldingen kies je door er op te klikken met je muis. Er verschijnt dan een zwart kader om het prentje. </p> <p> Nadat je twee afbeeldingen hebt gekozen duw je op de Enter toets om verder te gaan naar de volgende trial. </p> <p> Duw op Enter om verder te gaan </p> <b> Soms komt er een laadscherm in het beeld. Wacht dan even enkele seconden, dit duurt doorgaans nooit lang.</b>")
        ,
        newTextInput("Subject", randomnumber = Math.floor(Math.random()*1000000))             
        ,
        newVar("Subject")
            .settings.global()
            .set( getTextInput("Subject") )
        ,           
        newCanvas( "myCanvas", 500, 800)
            .settings.add(0,0, getText("WelcomeText"))
            .print()
            ,
       newKey("Enter", "Enter")
                .wait()
     )
    .log( "Subject" , getVar("Subject"))

// Implementing the Trials
    PennController.Template("trials_pictureselection.csv",
        row => PennController("trials", 
            newText("sentence", row.Sentence)
                .settings.center()
                .settings.css("font-size", "30px")
                .settings.bold()
                .print()
            ,                      
            newSelector("subjects")
            ,
            newSelector("objects")
            ,                  
            newImage("subject_sg", row.Subject_sg)         
                    .settings.selector("subjects")
            ,
            newImage("subject_pl", row.Subject_pl)                              
                    .settings.selector("subjects")
            ,
            newImage("object_sg", row.Object_sg)
                    .settings.selector("objects")
            ,
            newImage("object_pl", row.Object_pl)                           
                    .settings.selector("objects")
            ,
            newCanvas( 'myCanvas', 900, 900)
                .settings.add( 100, 50, getImage("subject_sg"), 0 )
                .settings.add( 100, 400, getImage("subject_pl"), 1 )
                .settings.add( 550, 50, getImage("object_sg"), 2 )
                .settings.add( 550, 400, getImage("object_pl"), 3 )
                .center()
                .print()
            ,
            getSelector("subjects")
                .shuffle()
                .frame("solid 6px black")
                .log("all")
                .wait()              
            ,
            getSelector("objects")
                .shuffle()
                .frame("solid 6px black")
                .log("all")
                .wait()              
            ,
            newKey("Enter", "Enter")
                .wait()
           )
    .log( "Subject"         , getVar("Subject")         )     
    .log( "Group"           , row.Group            )                            
    .log( "Sentence"        , row.Sentence         )
    .log( "Item"            , row.Item             )
    .log( "Quantifier"      , row.Quantifier       )                            
                            
)

PennController("prequestionnaire",
        newText("PreQuestionnaireText", "<p> Bedankt voor je deelname! </p> Het doel van dit korte experimentje is om te zien of de instructies van dit experiment duidelijk zijn en of het goed te begrijpen is wat je moest doen. Daarom volgt een korte vragenlijst op de volgende pagina waarin ik vraag wat je van dit korte experimentje vond. </p> <p> Heb je vragen? Je kunt me bereiken via mieke.slim@ugent.be </p> <p> Duw op Enter om verder te gaan </p>")
        ,
        newCanvas( "myCanvas", 500, 800)
            .settings.add(0,0, getText("PreQuestionnaireText"))
            .print()
        ,
            newKey("Enter", "Enter")
                .wait()
     )

// Vragen gegevens:
PennController("questionnairepage",
    newHtml("Questionnaire", "Questionnaire_Instructions.html")
        .settings.log()
        .print()
    ,
    newButton("VerstuurAntwoorden", "Verstuur antwoorden")
        .print()
        .wait(
            getHtml("Questionnaire").test.complete()
                .failure( getHtml("Questionnaire").warn() )
        )                      
)
.log( "Subject", getVar("Subject")) 


PennController.SendResults("send");


    PennController("exit",
        newText("ExitText", "<p> Dit is het einde! </p> Nogmaals bedankt voor je deelname. </p> <p> Je kunt het experiment sluiten door de browser af te sluiten (een eventuele pop-up mag je negeren) </p> <p> Heb je vragen? Je kunt me bereiken via mieke.slim@ugent.be </p>")
        ,
        newCanvas( "myCanvas", 500, 800)
            .settings.add(0,0, getText("ExitText"))
            .print()
        ,
       newKey("Enter", "Enter")
                .wait()
     )
