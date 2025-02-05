const verkaeufer_data = {

    mail: "info@verkaeufer.de",
    firmenname: "Testfirma GmbH",
    strasse: "Sellergasse 118",
    strasse_zusatz: "1. Etage",
    plz: "98765",
    stadt: "Sellerhausen",
    land: "DE",
    umsatzsteuer_id: "DE12345765",
    handelsregister_eintrag: "HRB123",
    zusatz_rechtsform:"GmbH",
    kontakt:{
        name: "Hoekerer",
        telefon: "0123456789",
        mail: "hoekerer@verkaeufer.de"
    },
    IBAN: "DE75512108001245126199",
//Zahlungsbedingungen: T[Tage n] [Prozent]% B[Basisbetrag, optional], z.B. T3 5% B150.
//Mehrere Zeilen mit \r\n trennen, keine Leerzeichen in den einzelnen Segmenten"
    Zahlungsbedingungen: "T0 5%\r\nT7 3% B160"

}
