const TAPPA_2_DATA = {
    id: "tappa-2",
    titolo: "Seconda Tappa: La Sentinella",
    icon: "<img src='https://flagcdn.com/w80/ma.png' class='flag-icon'>",
    theme: { 
        bg: 'bg-[#B8860B]',
        text: 'text-[#785502]',
        border: 'border-[#B8860B]', 
        // Ricordati di mettere qui il link dello sfondo che preferisci (magari la porta della Kasbah o gli zellij)
        sfondo: "INSERISCI_LINK_SFONDO_TAPPA_2"  
    },
    contenuto: [
        // --- 1. L'ATTERRAGGIO: DAL VIDEO AL FARO ---
        { 
            type: "immagine", 
            src: "img/il_faro_chiama.jpg", // Foto tappeto che atterra sulla costa
            alt: "Il tappeto volante atterra sulla costa africana"
        },
        { 
            type: "testo", 
            paragrafo: "<em>\"La costa sfuma, il faro ci chiama, il tappeto si posa, il viaggio si compie ora.\"</em>" 
        },
        { 
            type: "testo", 
            paragrafo: "Con ancora negli occhi la lunga scia rossa del viaggio sulla mappa, il nostro tappeto volante tocca terra. Non atterriamo nel caos, ma nel silenzio del vento. La 'chiamata' ci ha portati qui, sulla punta estrema d'Africa, ai piedi di un gigante solitario." 
        },
        { 
            type: "immagine", 
            src: "INSERISCI_LINK_FOTO_31752", // Foto 31752.jpg (Faro verticale da vicino)
            alt: "Il Faro di Capo Spartel visto dal basso"
        },
        { 
            type: "didascalia", 
            testo: "Sotto la Sentinella. Atterriamo ai piedi del faro che, dal 1864, sorveglia l'oceano." 
        },

        // --- 2. L'INCONTRO DEI MARI & PATIO ---
        { 
            type: "testo", 
            paragrafo: "Perché proprio qui? Perché questo è un abbraccio tra due giganti. Davanti a noi, le acque calde del Mediterraneo si fondono con le correnti fredde dell'Atlantico." 
        },
        { 
            type: "immagine", 
            src: "INSERISCI_LINK_FOTO_10064", // Foto 10064.jpg (Cuore Cap Spartel)
            alt: "Cuore in metallo Cap Spartel"
        },
        { 
            type: "didascalia", 
            testo: "Dove due blu si toccano. Il Mediterraneo finisce, l'Atlantico inizia, e Tangeri li unisce." 
        },
        { 
            type: "testo", 
            paragrafo: "Entriamo per un istante nel cuore del guardiano. Il ruggito dell'oceano si attutisce in un patio inondato di sole." 
        },
        { 
            type: "immagine", 
            src: "INSERISCI_LINK_FOTO_10070", // Foto 10070.jpg (Patio interno)
            alt: "Patio interno del faro"
        },
        { 
            type: "didascalia", 
            testo: "L'oasi interna. Archi moreschi e luce calda nel cuore del faro: il primo benvenuto dell'architettura locale." 
        },

        // --- 3. LA STORIA DEL FARO (IL MUSEO) ---
        { 
            type: "testo", 
            paragrafo: "Qui la storia è scritta sui muri. Scopriamo che questa luce fu voluta dal Sultano dopo troppi naufragi." 
        },
        { 
            type: "immagine", 
            src: "INSERISCI_LINK_FOTO_10102", // Foto 10102.jpg (Cronologia)
            alt: "Cronologia costruzione"
        },
        { 
            type: "didascalia", 
            testo: "1861-1864: La cronologia di pietra. Quando il Sultano ordinò di accendere una luce nel buio." 
        },
        { 
            type: "immagine", 
            src: "INSERISCI_LINK_FOTO_10082", // Foto 10082.jpg (Storia costruzione)
            alt: "Storia del faro"
        },
        { 
            type: "didascalia", 
            testo: "Nato dalle onde. Non un capriccio estetico, ma una necessità vitale dopo i tragici naufragi." 
        },
        { 
            type: "immagine", 
            src: "INSERISCI_LINK_FOTO_10078", // Foto 10078.jpg (Sultano)
            alt: "Ritratto del Sultano"
        },
        { 
            type: "didascalia", 
            testo: "Il volto del comando. Il Sultano Sidi Mohammed Ben Abderahman, colui che volle trasformare Capo Spartel in un rifugio sicuro." 
        },
        
        // --- 4. I GUARDIANI ---
        { 
            type: "testo", 
            paragrafo: "Ma la tecnologia è nulla senza l'uomo. In questa stanza, sotto lo sguardo severo dei vecchi guardiani appesi al muro, sentiamo il peso della responsabilità." 
        },
        { 
            type: "immagine", 
            src: "INSERISCI_LINK_FOTO_10071", // Foto 10071.jpg (Lanterna Fresnel)
            alt: "Lanterna antica"
        },
        { 
            type: "didascalia", 
            testo: "Il cuore di cristallo. La vecchia lente che guidava i marinai nella tempesta." 
        },
        { 
            type: "immagine", 
            src: "INSERISCI_LINK_FOTO_10076", // Foto 10076.jpg (Murales)
            alt: "Murales guardiani"
        },
        { 
            type: "immagine", 
            src: "INSERISCI_LINK_FOTO_10075", // Foto 10075.jpg (Ritratti)
            alt: "Ritratti guardiani"
        },
        { 
            type: "didascalia", 
            testo: "I volti della luce. Generazioni di guardiani che hanno vissuto in solitudine per proteggere i naviganti." 
        },

        // --- 5. GROTTE D'ERCOLE ---
        { 
            type: "testo", 
            paragrafo: "Salutiamo il faro. Sulla via del ritorno, la natura ci regala il suo monumento più celebre: le Grotte d'Ercole." 
        },
        { 
            type: "immagine", 
            src: "INSERISCI_LINK_FOTO_32125", // Foto 32125.jpg (Grotta scura)
            alt: "Interno grotta scura"
        },
        { 
            type: "didascalia", 
            testo: "Nel ventre della leggenda. Dove l'eroe greco riposò dopo le sue fatiche." 
        },
        { 
            type: "testo", 
            paragrafo: "Ma il buio della caverna serve solo a incorniciare la luce. Avanzando verso il rumore delle onde, la roccia si apre in una forma che lascia senza fiato." 
        },
        { 
            type: "immagine", 
            src: "INSERISCI_LINK_FOTO_24218", // Foto 24218.jpg (Africa shape)
            alt: "Finestra a forma d'Africa"
        },
        { 
            type: "didascalia", 
            testo: "L'Occhio dell'Africa. Una finestra naturale scolpita dal mare che guarda verso l'infinito." 
        },

        // --- 6. LA STRADA E LE MURA ---
        { 
            type: "testo", 
            paragrafo: "Il tappeto riprende quota basso, seguendo la litoranea che unisce la natura selvaggia alla città." 
        },
        { 
            type: "immagine", 
            src: "INSERISCI_LINK_FOTO_24621", // Foto 24621.jpg (Strada costiera)
            alt: "Strada costiera"
        },
        { 
            type: "didascalia", 
            testo: "Il nastro tra due mondi. La litoranea ci guida dolcemente dalla natura selvaggia fino ai piedi delle mura bianche." 
        },
        { 
            type: "testo", 
            paragrafo: "Ed eccoci arrivati. La strada finisce dove iniziano le fortificazioni." 
        },
        { 
            type: "immagine", 
            src: "INSERISCI_LINK_FOTO_1765101955648", // Foto 1765101955648.jpeg (Mura Kasbah)
            alt: "Mura della Kasbah"
        },
        { 
            type: "didascalia", 
            testo: "La fortezza bianca. Le mura della Kasbah si ergono fiere: il confine tra il mare e la città vecchia." 
        },
        
        // --- 7. IL PONTE E L'INIZIO DELLA CITTA' ---
        { 
            type: "testo", 
            paragrafo: "Siamo arrivati al confine tra la natura e la storia. Le mura bianche si alzano sopra di noi come una diga. Ma per capire davvero l'anima di questa città, non basta guardarla dal basso. Dobbiamo guardare con i suoi occhi. Saliamo dunque verso la vetta, lasciandoci guidare dal vento." 
        },

        // --- 8. IL CORPO CENTRALE ORIGINALE (KASBAH) ---
        { type: "testo", paragrafo: "Non c'è modo migliore per capirla se non dal suo punto più alto, le mura della Kasbah." },
        { type: "testo", paragrafo: "Se Istanbul era un'anima multipla che si avvolgeva su se stessa, Tangeri è definita dal suo sguardo. È la 'Sentinella', un'anima unica e fiera, 'proiettata verso l'esterno', la cui bellezza è nel dialogo costante con \"l'altro\" che le sta di fronte." },
        { type: "testo", paragrafo: "Questo scatto cattura la sua essenza. Non guardiamo la città, ma guardiamo con la città. È l'Africa che guarda l'Europa, un dialogo muto attraverso quel 'cancello d'acqua' che è lo Stretto di Gibilterra." },
        { type: "testo", paragrafo: "Ai nostri piedi, il porto moderno si stende ordinato, ma il vero orizzonte di Tangeri è li, oltre il mare.\"" },
        { type: "immagine", src: "https://i.postimg.cc/NFb7f8dW/Screenshot-20251027-210421-Instagram.jpg" },
        { type: "didascalia", testo: "Lo sguardo della Sentinella: dalle mura della Kasbah (قصبة) l'Africa osserva l'Europa attraverso lo Stretto di Gibilterra (مضيق جبل طارق)." },
        { type: "immagine", src: "https://i.postimg.cc/httZxvxf/Screenshot-20251029-005049-Samsung-Internet.jpg" },
        { type: "approfondimento", titolo: "UNO SGUARDO SULLA SCRITTURA: L'ALFABETO PERDUTO", paragrafo: "Mentre trascrivo i nomi di Tangeri (طنجة) e della Kasbah (قصبة) in arabo lo \"sguardo\" non può fare a meno di notare la scrittura stessa. L'alfabeto arabo (usato in Marocco) è un abjad, un sistema elegante scritto da destra a sinistra, dove sono le consonanti a definire la struttura della parola. È una scrittura che, con le sue varianti, unisce visivamente un mondo che va da Rabat a Baghdad. Questo ci porta inevitabilmente a Istanbul. Oggi, i nomi turchi (come Galata, Pera Palace, Eminönü) ci appaiono familiari, scritti con i nostri stessi caratteri. Ma, non è sempre stato cosi. Per secoli, la lingua dell'Impero Ottomano il Turco Ottomano è stata scritta usando una versione modificata dell'alfabeto perso-arabo. Era una scrittura complessa e colta, che però rendeva difficile l'alfabetizzazione di massa a causa della sua inadeguatezza a rappresentare i suoni vocalici turchi. La rottura, netta e radicale, avvenne nel 1928. All'interno della sua rivoluzione culturale per modernizzare la nazione e ancorarla all'Occidente, Mustafa Kemal Atatürk impose una delle riforme più audaci del XX secolo: l'abbandono dell'alfabeto arabo e l'adozione forzata di un nuovo alfabeto basato su quello latino. In pochi mesi, i caratteri che avevano definito l'Impero per 600 anni furono sostituiti per legge dal nuovo alfabeto turco di 29 lettere (simile al nostro, ma con aggiunte fonetiche come Ç, Ğ, Ö, Ş, Ü). Ecco, dunque, un'altra differenza cruciale tra le \"Due Sorelle\": Tangeri ha mantenuto la sua continuità storica e religiosa con la scrittura araba. Istanbul ha scelto una \"rivoluzione\", cambiando il suo stesso modo di scrivere per legarsi indissolubilmente all'Europa. Due storie, due destini, impressi persino nell'alfabeto che usano per scrivere i loro nomi." },
        { type: "didascalia", testo: "Ora torniamo dalla nostra Sentinella 😉" },
        { type: "immagine", src: "https://i.postimg.cc/L5mnXr7Y/Screenshot-20251027-235734-Samsung-Internet.jpg" },
        { type: "didascalia", testo: "Bab el Assa (باب العسة), la 'Porta della Guardia'. L'arco moresco che vigila sulla piazza e immette nella Kasbah." },
        { type: "testo", paragrafo: "A pochi passi dal belvedere da cui osservavamo l'Europa, si incontra il cuore antico della 'Sentinella': Bab el Assa. Il nome stesso significa 'Porta della Guardia', rafforzando l'identità di questa città-fortezza." },
        { type: "testo", paragrafo: "Questo è uno degli ingressi storici principali alla Kasbah. L'impatto segna subito una differenza profonda con Istanbul: là folla, movimento e marmi imperiali; qui, una quiete austera, quasi solenne." },
        { type: "testo", paragrafo: "Non ci sono le maioliche blu di Eminönü, ma mura massicce color ocra, consumate dal sole e dal vento dello Stretto. L'arco a ferro di cavallo è un portale che non invita, ma ammette al suo interno. È la vera corazza della Sentinella, un guscio che protegge il dedalo di vicoli che si nascondono dietro di esso." },
        { type: "testo", paragrafo: "Varcata questa soglia, ci si lascia alle spalle la piazza per scendere e perdersi nel labirinto bianco e blu della città vecchia." },
        { type: "immagine", src: "https://i.postimg.cc/hjbn3hGC/unnamed.jpg" },
        { type: "didascalia", testo: "Non maioliche dipinte, ma zellij: l'arte del mosaico geometrico marocchino, svelata appena dentro la Kasbah" },
        { type: "testo", paragrafo: "Appena appena superata Bab el Assa, la Kasbah rivela subito la sua estetica unica. Sulla sinistra, quasi come un comitato di benvenuto, si incontra questa fontana, un primo assaggio dell'arte decorativa marocchina." },
        { type: "testo", paragrafo: "Qui lo 'sguardo' coglie immediatamente la prima, grande differenza con Istanbul." },
        { type: "testo", paragrafo: "Se nella 'Prima Tappa' (nella Yeni Camii) eravamo circondati da grandi maioliche dipinte (ceramiche Iznik), con motivi floreali sinuosi che evocavano un giardino, qui ci troviamo di fronte a una tecnica completamente diversa: lo zellij." },
        { type: "testo", paragrafo: "Non si tratta di dipingere su una piastrella. Lo zellij è l'arte del mosaico. Migliaia di piccoli pezzi di ceramica smaltata (chiamati tesserae) vengono tagliati a mano, uno per uno, e poi incastrati magistralmente per formare motivi geometrici perfetti: stelle, poligoni e intrecci che si ripetono all'infinito." },
        { type: "testo", paragrafo: "È un lusso diverso, non basato sulla pittura ma sulla precisione matematica. È un'arte che trasforma la geometria in una forma di meditazione visiva, ed è la firma inconfondibile di questa 'Sorella' dello Stretto." },
        { type: "immagine", src: "https://i.postimg.cc/65K23GRK/724738-poster.jpg" },
        { type: "didascalia", testo: "Lo zellij è un mosaico in tessere di terracotta smaltata. Ogni pezzo viene tagliato a mano e incastrato con altri per formare motivi geometrici (spesso a base di stelle), che uniscono l'ingegneria matematica all'artigianato." },
        { type: "testo", paragrafo: "Lasciamo dietro di noi Bab el Assa per avventurarci tra i vicoli della medina." },
        { type: "testo", paragrafo: "Ed è qui che la mia impressione iniziale di Tangeri 'razionale e schematica' viene messa alla prova." },
        { type: "testo", paragrafo: "Se la vista dall'alto è ordinata (il porto, lo Stretto), la vita all'interno è un labirinto. È un dedalo di vicoli, un caos intimo, protetto dalle mura della Kasbah." },
        { type: "testo", paragrafo: "A differenza del frastuono pubblico di Eminönü, qui la vita è nascosta, ma vibrante. La Kasbah non è un museo vuoto; è un quartiere abitato. Ad ogni angolo, la storia si fonde con una modernità elegante: una bottega d'artigianato si annida sotto l'ombra di una palma, un caffè culturale offre una sosta con vista sulla città, e un antico palazzo si trasforma in un ristorante di design." },
        { type: "testo", paragrafo: "È un'anima diversa da Istanbul: non un'esplosione, ma un segreto sussurrato tra i ciottoli." },
        { type: "immagine", src: "https://i.postimg.cc/ZnSM2LQf/20250915-123759.jpg" },
        { type: "didascalia", testo: "L'ombra di una palma svela una bottega. La vita quotidiana e l'artigianato nascosti nei vicoli della città vecchia." },
        { type: "immagine", src: "https://i.postimg.cc/vmDFt3RV/20250915-123045.jpg" },
        { type: "didascalia", testo: "Il lusso della sosta. Un caffè culturale sui ciottoli della Kasbah, dove il tempo rallenta e lo sguardo si perde sulla città." },
        { type: "immagine", src: "https://i.postimg.cc/9fxXWD2y/20250915-122937.jpg" },
        { type: "didascalia", testo: "Il design moderno incontra la tradizione. Un ristorante (La Terraza de la Medina) che reinterpreta l'architettura della Kasbah con eleganza." },
        { type: "testo", paragrafo: "Proseguendo la nostra discesa, l'architettura della Kasbah si rivela in tutto il suo \"caos intimo\". Lo \"sguardo\", ancora una volta, è incorniciato: un arco di pietra ci invita a scendere più a fondo, a seguirlo. E noi seguiamo. Seguiamo le figure in djellaba che ci precedono. Non c'è la folla oceanica e rumorosa di Eminönü; qui la vita scorre in un altro modo. Le persone non camminano, scivolano silenziose sui ciottoli, come se seguissero un sentiero invisibile, noto solo a loro, che li guida nel labirinto. Il bianco quasi accecante delle mura, che dà a Tangeri la sua fama di \"città bianca\", è il vero protagonista. Ma è un bianco che vive di interruzioni improvvise: il blu vivido delle persiane, un tocco di rosa pastello su un muro basso, il giallo ocra di una facciata più antica che resiste al tempo. Persino in cima a uno degli edifici, le merlature bianche che si stagliano contro il cielo ci ricordano che siamo ancora dentro la \"Sentinella\", dentro la fortezza. Ma questa è la sua vita interna, un dedalo che protegge la sua quotidianità, come il cartello di un caffè che spunta in un angolo, un piccolo segno di modernità in un abbraccio senza tempo." },
        { type: "immagine", src: "https://i.postimg.cc/XqbgwRnj/Tangeri-vicolo.jpg" },
        { type: "didascalia", testo: "Incorniciata dalla pietra, la discesa nel labirinto bianco. Le djellaba scivolano silenziose tra lampi di blu e mura antiche." },
        { type: "testo", paragrafo: "Scendendo ancora, lo \"sguardo\" viene intercettato da un'eco del Ventesimo secolo, un'insegna che sporge da un muro come una pagina di storia vissuta. \"CAFE BABA\". E sotto, una quasi timida ammissione in inglese: \"Famous inMedina\". Qui, la \"Sentinella\" rivela un'anima diversa, più recente, quasi segreta. Questa non è la storia dei sultani o dei costruttori di fortezze; questa è la storia della controcultura. Questo caffè, fondato negli anni '40, è un'istituzione bohémien. È qui, in questo locale autentico e per nulla lussuoso, che la Beat Generation e poi i Rolling Stones trovarono il loro \"quartier generale\" marocchino. Si può quasi immaginare Keith Richards, seduto a uno dei semplici tavoli tra le pareti tappezzate di fotografie, con in mano un bicchiere di tè alla menta e quel sebsi—la pipa tradizionale—che sembra essere proprio quella stilizzata in modo quasi ingenuo sull'insegna. È un contrasto pazzesco. Se a Istanbul l'anima europea si specchiava nel lusso del Pera Palace, capolinea dell'Orient Express, qui a Tangeri l'anima \"altra\" si nasconde in un vicolo, ed è l'eco del rock 'n' roll. Non è un \"salotto\" di marmi, ma un rifugio di fumo e leggende." },
        { type: "immagine", src: "https://i.postimg.cc/2559ybw4/cafe-baba-tangeri.jpg" },
        { type: "didascalia", testo: "Un'insegna vissuta per un'icona bohémien. Dove la Kasbah incontra l'eco dei Rolling Stones, tra un tè alla menta e la storia del rock." },
        { type: "testo", paragrafo: "Mentre l'eco bohémien del Caffè Baba si affievolisce, la discesa ci inghiotte in un'energia completamente diversa; più si scende verso il cuore della medina, più il \"caos intimo\" dei vicoli alti si trasforma nel \"caos brulicante\" del souk. I vicoli non sono più silenziosi, ma diventano fiumi di persone. Le pareti bianche quasi scompaiono, coperte da un divampare di merci: tessuti appesi, maglie sportive che gridano nomi globali, lanterne, borse e artigianato che traboccano da ogni bottega." },
        { type: "immagine", src: "https://i.postimg.cc/c4fgPFQG/20250612-164456-2.jpg" },
        { type: "didascalia", testo: "Il cuore commerciale della medina. Il vicolo si fa souk: un fiume di vita sgorga tra le mura bianche." },
        { type: "immagine", src: "https://i.postimg.cc/rswMVCm8/20250612-164650-1-2.jpg" },
        { type: "didascalia", testo: "L'attesa dell'artigiano. Fuori dalla sua bottega, tra le merci esposte e le inferriate lavorate, il tempo del souk rallenta per un istante." },
        { type: "testo", paragrafo: "Non è la grandezza imperiale o la vastità dei bazar di Istanbul; è un'energia diversa, più compressa, verticale, un formicaio di scambi e di vita che scorre veloce tra i muri stretti della città vecchia. Siamo passati dalla quiete della \"Sentinella\" che guarda il mare, al suo grembo accogliente e commerciale." },
        { type: "testo", paragrafo: "Ma il \"grembo accogliente\" del souk non è solo un'esperienza per gli occhi; è, prima di tutto, un assalto (o forse una carezza) all'olfatto. Ed è proprio seguendo una scia di spezie, di essenze e di erbe secche che lo \"sguardo\" viene attirato sotto questo arco. Non è solo artigianato, questa è l'anima curativa della medina: un \"Herbal Medina Center\". Qui, la cultura dei rimedi naturali, dei profumi e delle spezie è tutto. Non sono solo merci: sono medicina, bellezza e tradizione. L'invito è chiaro già dall'esterno, dove i poster celebrano l'olio di fico d'India e i \"Tesori del Marocco\", mentre i cesti a terra offrono i primi assaggi: olive, spezie, radici." },
        { type: "immagine", src: "https://i.postimg.cc/QC7VJQLh/20250918-165109.jpg" },
        { type: "immagine", src: "https://i.postimg.cc/QxpHBJkB/20250918-165212.jpg" },
        { type: "testo", paragrafo: "Entrando, la promessa si svela e l'aria si fa densa. File di cesti appesi offrono erbe e petali sotto un'insegna che ci ricorda un'antica verità: \"C'est la nature qui a raison\", \"È la natura che ha ragione\". E poi, l'invito a perdersi. L'erboristeria non è solo un negozio, è un tunnel sensoriale. Lo \"sguardo\" si infila in questo corridoio stretto, dove il pavimento a zellij colorato e le pareti decorate quasi vibrano di odori. È un viaggio dentro il viaggio, un corridoio che non porta solo a una scala in fondo, ma ti avvolge completamente negli aromi della terra. È qui che il souk ti cattura davvero, non con la vista, ma con l'olfatto." },
        { type: "immagine", src: "https://i.postimg.cc/RVcN3LQ0/20250918-165038.jpg" },
        { type: "immagine", src: "https://i.postimg.cc/Nf15yk78/20250918-165343.jpg" },
        { type: "didascalia", testo: "Un tunnel di profumi. Il corridoio dell'erboristeria, dove lo zellij guida l'olfatto più che lo sguardo." },
        { type: "testo", paragrafo: "Ancora inebriati dai profumi e dai colori del souk, i suoni del mercato si fermano inaspettatamente mentre veniamo circondati da un silenzio quasi mistico. Un muro di luce bianca, quasi accecante, si innalza nel cielo. Lo \"sguardo\" è colpito da questo improvviso \"vuoto\", da questa pausa nel caos. Non ci sono botteghe, non ci sono venditori, solo la purezza delle forme. Il bianco domina, interrotto solo dal verde scuro delle tegole smaltate che corrono lungo il tetto e dalla geometria complessa che decora il minareto." },
        { type: "immagine", src: "https://i.postimg.cc/9M1zmNJM/20250612-164431-2.jpg" },
        { type: "didascalia", testo: "La pausa sacra, il bianco accecante della moschea ferma il caos e impone un respiro di silenzio." },
        { type: "immagine", src: "https://i.postimg.cc/TwTpXXqv/20250612-164350-2.jpg" },
        { type: "didascalia", testo: "Lo \"sguardo\" è catturato dal verde profondo della porta, incorniciato da un ricamo di stucco e calligrafia che abbraccia l'ingresso sacro." },
        { type: "testo", paragrafo: "È la grande moschea della medina. È la \"Sentinella\" che, pur avendo un cuore commerciale e affollato, custodisce un'anima di silenzio e di fede. È un'architettura che non grida, ma sussurra, imponendo un momento di rispetto e di pausa poco prima di rituffarsi nei vicoli fino a raggiungere la porta del Gran Socco affacciandoci su Place du 9 Avril 1947.." },
        { type: "testo", paragrafo: "Prima di raggiungere la piazza, tra gli ultimi, intricati vicoli veniamo nuovamente sorpresi dalle forme e dai colori. Il souk, quasi a non volerci lasciare andare, svela i suoi ultimi gioielli: lo \"sguardo\" incontra prima di tutto l'eleganza di una fontana accanto alla Yassini Gallery, un dono alla strada, un'opera d'arte in zellij che offre ristoro." },
        { type: "immagine", src: "https://i.postimg.cc/66vTQvX0/20250612-164637-2.jpg" },
        { type: "didascalia", testo: "L'eleganza dello zellij alla Yassini Gallery. L'arte si fa fontana sotto lo sguardo del mercante in attesa." },
        { type: "testo", paragrafo: "Ma la sorpresa non è solo esteriore. Spinti dalla curiosità, sbirciando all'interno del ristorante \"Vandalucia\", si apre un mondo inaspettato: un'esplosione di blu cobalto e bianco, dove lo zellij della colonna incontra gli stucchi intricati del soffitto." },
        { type: "immagine", src: "https://i.postimg.cc/28NyLSkn/20250612-143747.jpg" },
        { type: "didascalia", testo: "Curiosando all'interno: il blu profondo e il bianco degli stucchi che si incontrano sopra il mosaico della colonna." },
        { type: "testo", paragrafo: "Ritornati nel vicolo, la luce e l'ombra giocano un'ultima volta con l'artigianato. È qui che l'arte marocchina si mostra in un contrasto quasi pittorico: tappeti appesi come arazzi attendono accanto a mosaici incastonati nel muro,." },
        { type: "immagine", src: "https://i.postimg.cc/5NWyQ24w/20250612-142347-1.jpg" },
        { type: "didascalia", testo: "L'arte appesa e l'arte incastonata. Un tappeto berbero attende accanto a un mosaico zellij, mentre un'ombra profonda offre riposo sulla soglia." },
        { type: "testo", paragrafo: "Sono gli ultimi lampi di bellezza della medina, istantanee di vita e di arte che ci accompagnano fino all'ultimo passo, prima che il vicolo stretto si apra e ci 'restituisca' alla luce e allo spazio aperto della grande piazza." },
        { type: "testo", paragrafo: "Ed eccola, la soglia. Quel \"passo\" che ci restituisce alla luce e allo spazio aperto ci porta qui, davanti al grande arco bianco che segna il confine della medina: la porta del Gran Socco. È qui che si conclude la nostra \"passeggiata inversa\". La maggior parte dei visitatori inizia da questa piazza, dal basso, per salire faticosamente verso la Kasbah. Noi abbiamo fatto il contrario, fedeli alla nostra rotta, siamo partiti dall'alto, dallo \"sguardo\" della Sentinella, e siamo scesi nel suo grembo, attraversando il souk brulicante, i silenzi sacri e i vicoli profumati. Stiamo guardando la porta d'ingresso, ma dal nostro punto di vista è l'uscita." },
        { type: "immagine", src: "https://i.postimg.cc/nhXMRcFJ/20250612-134332.jpg" },
        { type: "didascalia", testo: "L'arco del Gran Socco. La porta che separa il labirinto dalla piazza, fine della nostra discesa dalla Kasbah." },
        { type: "testo", paragrafo: "Proprio accanto a questa porta, le mura bianche e merlate che definiscono il perimetro della città vecchia ospitano la sua carta d'identità: la mappa della Medina. Guardando questo \"Plan de la Medina de Tanger\" inciso nella pietra, lo \"sguardo\" non vede solo un groviglio di linee, ma ripercorre il sentiero fatto: riconosce la discesa dalla Kasbah, i vicoli del souk, la moschea. È il labirinto che ci siamo appena lasciati alle spalle, ora visto e capito dall'esterno." },
        { type: "immagine", src: "https://i.postimg.cc/FssYSVwk/20250612-134651.jpg" },
        { type: "didascalia", testo: "La mappa incisa della Medina di Tangeri. La conferma su pietra del labirinto che abbiamo attraversato." },
        { type: "testo", paragrafo: "Ed eccoci arrivati. Con l'ultimo passo fuori dall'arco, il labirinto ci 'restituisce' definitivamente alla luce e allo spazio aperto di \"Place du 9 Avril 1947\", anche nota come \"Gran Socco\". Lo 'sguardo' si posa subito sui suoi simboli: la grande fontana circolare che mormora al centro e, sopra ogni cosa, il vessillo rosso del Marocco. La stella verde sventola fiera contro il cielo, un sigillo d'identità posto a guardia della medina che ci siamo appena lasciati alle spalle. È qui che si conclude la nostra discesa dalla 'Sentinella'. Ma la storia di questa piazza, un crocevia di culture, politica e commercio, è un racconto così denso e affascinante che merita una tappa a sé. Per ora, ci fermiamo qui, al confine tra la medina e la città nuova." },
        { type: "immagine", src: "https://i.postimg.cc/htXhyPDG/20250612-133816.jpg" },
        { type: "didascalia", testo: "La fine della discesa: la bandiera marocchina sventola fiera sulla fontana di Place du 9 Avril 1947, all'uscita della medina." },
        { type: 'testo', paragrafo: "<p>Sguardi Conclusivi. Racchiudere Tangeri in poche immagini è impossibile, ma questi ultimi 'sguardi' ne catturano l'essenza. Tangeri è l'eleganza dei suoi palazzi bianchi, l'intimità di una passeggiata sotto un pergolato di legno, l'arte carismatica che scoppia in un dettaglio di zellij, la vita quotidiana che scorre nei caffè. Tangeri è il suo orizzonte: un cannone, eco di epoche passate, che ancora oggi sovrasta il porto, a perenne guardia dello Stretto. È questa \"La Sentinella\", l'anima unica dedita incessantemente a compiere il suo dovere nonostante lo scorrere del tempo.</p>" },
        { type: 'immagine', src: "https://i.postimg.cc/6p8Tj5Wy/1762298567893.png", alt: "Avatar in riposo sull'amaca" },
        { type: 'testo', paragrafo: "<p style=\"text-align:center; font-style:italic; margin-top:10px; margin-bottom:20px;\">\"È l'ora di un meritato riposo. Sospesi tra un tè alla menta marocchino ed uno turco, da degustare nei loro caratteristici bicchieri, ci rilassiamo in attesa di riprendere il viaggio, ci aspetta la Terza Tappa : 'Passeggiando tra souk e bazaar'. Pronti a saltare danzando tra Africa e Asia?\"</p>" },
        { type: 'immagine', src: "https://i.postimg.cc/4Nv2ntrg/1762289697198.png", alt: "Avatar che salta nel portale" }
    ]
};