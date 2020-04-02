$(function () { // wait for document ready
    // init
    var width = $(window).width();
    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {}
    });

    if (width > 600) { 
        // get all slides
        var slides = document.querySelectorAll("section.panel");

        // create scene for every slide
        for (var i=0; i<slides.length; i++) {
            new ScrollMagic.Scene({
                    triggerElement: slides[i],
                    triggerHook: 'onLeave',
                    duration: "80%" // this works just fine with duration 0 as well
                })
                .setPin(slides[i], {pushFollowers: false})
                //.addIndicators() // add indicators (requires plugin)
                .addTo(controller);
        }

        new ScrollMagic.Scene({triggerElement: slides[0]})
                        // trigger animation by adding a css class
                        .setClassToggle("#gray-box", "visible")
                        .reverse(false)
                        //.addIndicators({name: "1 - add a class"}) // add indicators (requires plugin)
                        .addTo(controller);

        var streamers = document.querySelectorAll(".streamers > .streamer");
        for (var i=0; i<streamers.length; i++) {
            new ScrollMagic.Scene({
                triggerElement: slides[0],
                offset:250*(i+1)
            })
            // trigger animation by adding a css class
            .setClassToggle(streamers[i], "visible")
            .reverse(false)
            //.addIndicators({name: "streamer " + i+1 + " - add a class"}) // add indicators (requires plugin)
            .addTo(controller);
        }
        new ScrollMagic.Scene({
            triggerElement: slides[0],
            offset:900
        })
        // trigger animation by adding a css class
        .setClassToggle(".streamers > h3", "visible")
        .reverse(false)
        //.addIndicators({name: "Top Streamers - add a class"}) // add indicators (requires plugin)
        .addTo(controller);

        // build scene
        new ScrollMagic.Scene({triggerElement: slides[1], triggerHook: 'onLeave'})
                        .setClassToggle("#instagram", "visible")
                        .reverse(false)
                        //.addIndicators({name: "instagram css class"}) // add indicators (requires plugin)
                        .addTo(controller);
        new ScrollMagic.Scene({triggerElement: slides[1], triggerHook: 'onLeave', offset:100})
                        .setClassToggle("#facebook", "visible")
                        .reverse(false)
                        //.addIndicators({name: "facebook css class"}) // add indicators (requires plugin)
                        .addTo(controller);
        
        let subStart = 300;
        let subMax = 9700;
        new ScrollMagic.Scene({triggerElement: slides[2], duration: "100%"})
                        .addTo(controller)
                        //.addIndicators() // add indicators (requires plugin)
                        .on("progress", function (e) {
                            var subs = (e.progress * subMax) + subStart;
                            $("#subs").text(parseInt(subs, 10));
                            $("#revenue").text("$" + parseInt((subs * 4.45), 10));
                        }); 
    } else {
        let subStart = 300;
        let subMax = 9700;
        new ScrollMagic.Scene({triggerElement: "#last", duration: "100%"})
                        .addTo(controller)
                        .on("progress", function (e) {
                            var subs = (e.progress * subMax) + subStart;
                            $("#subssm").text(parseInt(subs, 10));
                            $("#revenuesm").text("$" + parseInt((subs * 4.45), 10));
                        }); 
    }

    $("#mce-EMAIL").focus(function() {
        var $el = $("#mc_embed_signup");
        if (!$el.hasClass('focus'))
            $("#mc_embed_signup").addClass('focus');
    });
    $("#mce-EMAIL").blur(function() {
        if ($(this).val() === "")
            $("#mc_embed_signup").removeClass('focus');
    });
});