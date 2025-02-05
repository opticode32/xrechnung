const testdaten = {
    test_kundennummer: "123456",
    test_firmenname: "Max Musterfirma GmbH",
    test_strasse: "Firmagasse 12",
    test_strasse_zusatz: "Hinterhaus",
    test_PLZ: "12345",
    test_Stadt: "Firmenhausen",
    test_Land: "DE",
    test_mail: "firma@mail.de",

    test_lieferdatum: "2025-12-12",
    test_lieferort_kennung: "Zentralstelle I/II",
    test_Lieferempfaenger: "Firma Empfang GmbH",
    test_lieferadresse: "Lieferfirmenstraße 12",
    test_lieferadresse_zusatz: "Hinterlieferhaus",
    test_lieferland: "DE",
    test_lieferplz: "12345",
    test_lieferstadt: "Lieferhausen",

    test_lieferdatum: "2025-01-31",
    test_lieferort_kennung: "Produktion",
    test_empfaenger_name: "Firma Franz Empfänger",
    test_empfaenger_strasse_nr: "Musterfangstraße 1",
    test_empfaenger_strasse_zusatz: "Hinterhaus, grüne Tür",
    test_empfaenger_land: "DE",
    test_empfaenger_plz: "12345",
    test_empfaenger_ort: "Empfangershausen",

    test_zahlungsweise: "58",
    test_IBAN: "DE75512108001245126199",
    test_ust_id: "DE8987789878",

    test_positionen: "1x (Glas R) #123 *Progressiv Super 1.50 HMC* _+1,5 Add 2,50_ €550 [115480]\r\n1x (Glas L) #123 *Progressiv Super 1.50 HMC* _+1,75 Add 2,5_ €550 [115480]\r\n1x (Fassung) #1234 *RolfiDolfi* _Mod 123 col 4 54-18_ €400 [115480]\r\n(elektronische Sehhilfe) *maxilupo5* €499 M7%",

    test_rechnungsnummer: "R-12345",
    test_rechnungsdatum: "2025-01-31",
    test_faelligkeitsdatum: "2025-02-28",
    test_rechnungsart: "380",
    test_bemerkung_rechnung: "Dies ist nur eine Testrechnung. Datt müssen'se nich bezahln.",
    test_kommission_leitweg: "K123456/2345"
};

function testdaten_einsetzen(){
    $('#Kundennummer').val(testdaten.test_kundennummer);
    $('#Kunde_Name').val(testdaten.test_firmenname);
    $('#Kunde_Strasse').val(testdaten.test_strasse);
    $('#Kunde_Strasse_2').val(testdaten.test_strasse_zusatz);
    $('#Kunde_PLZ').val(testdaten.test_PLZ);
    $('#Kunde_Ort').val(testdaten.test_Stadt);
    $('#Kunde_Land').val(testdaten.test_Land);
    $('#Kunde_Mail').val(testdaten.test_mail);

    $('#Lieferdatum').val(testdaten.test_lieferdatum);
    $('#Lieferort_Kennung').val(testdaten.test_lieferort_kennung);
    $('#Empfaenger_Name').val(testdaten.test_empfaenger_name);
    $('#Lieferadresse_Strasse_Nr').val(testdaten.test_empfaenger_strasse_nr);
    $('#Lieferadresse_Zusatz').val(testdaten.test_empfaenger_strasse_zusatz);
    $('#Lieferadresse_Land').val(testdaten.test_empfaenger_land);
    $('#Lieferadresse_PLZ').val(testdaten.test_empfaenger_plz);
    $('#Lieferadresse_Ort').val(testdaten.test_empfaenger_ort);

    $('#Zahlungsweise').val(testdaten.test_zahlungsweise);
    $('#IBAN').val(testdaten.test_IBAN);

    $('#Rechnungsnummer').val(testdaten.test_rechnungsnummer);
    $('#Rechnungsdatum').val(testdaten.test_rechnungsdatum);
    $('#Faelligkeitsdatum').val(testdaten.test_faelligkeitsdatum);
    $('#Rechnungsart').val(testdaten.test_rechnungsart);
    $('#Bemerkung_Rechnung').val(testdaten.test_bemerkung_rechnung);
    $('#Kommission_Kunde').val(testdaten.test_kommission_leitweg);

    $('#Kunde_Steuer_ID').val(testdaten.test_ust_id);

    $('#Positionen').val(testdaten.test_positionen);

}