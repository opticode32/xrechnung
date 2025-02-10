var mwst_satz_standard = "19";

function zahldaten_eintragen(){
    $('#IBAN').val(verkaeufer_data.IBAN);
    $('#Zahlungsbedingungen').val(verkaeufer_data.Zahlungsbedingungen);
}

function runden(zahl){
    zahl = zahl*100;
    zahl = Math.round(zahl);
    zahl = zahl/100;
    return zahl;
}

function betrag_zurechtbiegen(zahl, mwst){
    zahl_start = parseFloat(zahl);
    mwst_start = parseFloat(mwst);
    zahl_neu = runden((zahl_start)/(1+mwst_start/100));
    zahl_neu = runden(zahl_neu*(1+mwst_start/100));

    if (zahl_neu != zahl_start){betragsaenderung = "ja";}

    if (zahl_neu>zahl_start){
        zahl_start_=zahl_start-0.01;
        zahl_neu = runden(zahl_start_/(1+mwst_start/100));
        zahl_neu = runden(zahl_neu*(1+mwst_start/100));
            

    }


    return zahl_neu;
}

function Zahlungsbedingungen_aufbereiten(data_roh){
    var xml="";
    skonto_tage=0;
    skonto_satz=0;
    skonto_basisbetrag=0;
    xml =   '    <cac:PaymentTerms>\r\n         <cbc:Note>\r\n';
    data = data_roh.split('\n');
    data.forEach(function(item){
        item = item.replace(",",".");
        console.log(item);
        if ((/^T(\d{1,3})\s/).test(item)){
            tage_skonto = item.match(/^T(\d{1,3})\s/)
            skonto_tage = tage_skonto[1];
        } else {alert('Die Skonto-Angabe (Tage) ist fehlerhaft.');}

        if ((/\s([0-9\.,]+)%/).test(item)){
            prozent_skonto = item.match(/\s([0-9\.,]+)%/);
            console.log(prozent_skonto);
            skonto_prozent = '#PROZENT=' + parseFloat(prozent_skonto[1]).toFixed(2);
        } else {alert('Die Skonto-Angabe (Prozent) ist fehlerhaft.');}

        if ((/\sB([0-9\.,]+)/).test(item)){
            basisbetrag_skonto = item.match(/\sB([0-9\.,]+)/);
            skonto_basisbetrag = '#BASISBETRAG=' + parseFloat(basisbetrag_skonto[1]).toFixed(2);
        } else {skonto_basisbetrag = "";}

        xml += '           #SKONTO#TAGE='+skonto_tage+skonto_prozent+skonto_basisbetrag+'#\r\n';
    });
    xml +='         </cbc:Note>\r\n     </cac:PaymentTerms>\r\n';
    return xml;
}

function positionen_aufbereiten(){
    zaehler=0;
    xml_positionen = "";
    xml_tax_sub = "";
    var positionen = $('#Positionen').val();
    var einzelpositionen = positionen.split("\n");

    einzelpositionen.forEach(einzelpositionen_aufbereiten);
    mwst_satz_mwst_betrag.forEach(function(betrag,satz){
        xml_tax_sub_position = tax_sub_original;
        xml_tax_sub_position = xml_tax_sub_position.replace('[MWST_Satz_sub]',satz.toFixed(1));
        console.log(satz.toFixed(2));
        xml_tax_sub_position = xml_tax_sub_position.replace('[MWST_gesamt_sub]',betrag.toFixed(2));
        console.log(betrag.toFixed(2));
//        xml_tax_sub_position = xml_tax_sub_position.replace('[NETTO_gesamt_sub]',mwst_satz_netto_betrag[art_mwst_satz[1]].toFixed(2));
        xml_tax_sub_position = xml_tax_sub_position.replace('[NETTO_gesamt_sub]',mwst_satz_netto_betrag[satz].toFixed(2));
        if (mwst_kategorie){
            xml = '                <cbc:ID>'+mwst_kategorie+'</cbc:ID>\r\n';
        } else {xml="";}
        xml_tax_sub_position = xml_tax_sub_position.replace('[xml_MWST_Kategorie]',xml);

        if (mwst_kategorie == "G"){
            xml = '                <cbc:TaxExemptionReasonCode>VATEX-EU-G</cbc:TaxExemptionReasonCode>\r\n';
        } else if (mwst_kategorie == "K"){
            xml = '                <cbc:TaxExemptionReasonCode>VATEX-EU-IC</cbc:TaxExemptionReasonCode>\r\n';
        } else {xml="";}
        xml_tax_sub_position = xml_tax_sub_position.replace('[xml_MWST_Ausnahme]',xml);
        
        xml_tax_sub += xml_tax_sub_position;
    });
    template = template.replace('[xml_Positionen]',xml_positionen);
}


function einzelpositionen_aufbereiten(item){
    zaehler += 1;
    art_anzahl = ["",""];
    art_anzahl[1] = "1";
    art_bemerkung = ["",""];
    art_nr = ["",""];
    art_name = ["",""];
    art_beschreibung = ["",""];
    art_preis = ["","0"];
    art_mwst_satz = ["",""];
    if (mwst_kategorie == "S"){art_mwst_satz[1] = mwst_satz_standard;}
    if (mwst_kategorie == "K" || mwst_kategorie == "G"){art_mwst_satz[1] = "0";}
    art_rabatt_satz = ["",""];
    art_rabatt_satz[1] = "0";
    art_kommission=["",""];
    var xml_einzelposition = position_original;

    if ((/^\d+x/).test(item)){
        art_anzahl = item.match(/(\d+)x/);
        xml = '        <cbc:InvoicedQuantity unitCode="XPP">'+art_anzahl[1]+'</cbc:InvoicedQuantity>\r\n';
    } else {xml='        <cbc:InvoicedQuantity unitCode="XPP">'+1+'</cbc:InvoicedQuantity>\r\n';}
    xml_einzelposition = xml_einzelposition.replace('[xml_rechnungsposition_anzahl]',xml);
    if ((/\((.+)\)/).test(item)){
        art_bemerkung = item.match(/\((.*)\)/);
        xml = '        <cbc:Note>'+art_bemerkung[1]+'</cbc:Note>\r\n';
    } else {xml="";}
    xml_einzelposition = xml_einzelposition.replace('[xml_rechnungsposition_bemerkung]',xml);
    if ((/#.+?\s/).test(item)){
        art_nr = item.match(/#(.+?)\s/);
        xml =   '            <cac:SellersItemIdentification>\r\n' +
                '                <cbc:ID>'+art_nr[1]+'</cbc:ID>\r\n'+
                '            </cac:SellersItemIdentification>\r\n';
    } else {xml="";}
    xml_einzelposition = xml_einzelposition.replace('[xml_rechnungsposition_artikelnummer]',xml);
    if ((/\*.+\*/).test(item)){
        art_name = item.match(/\*(.+)\*/);
        xml = '            <cbc:Name>'+art_name[1]+'</cbc:Name>\r\n';
    } else {xml="";}
    xml_einzelposition = xml_einzelposition.replace('[xml_rechnungsposition_artikelname]',xml);
    if ((/_(.+)_/).test(item)){
        art_beschreibung = item.match(/_(.+)_/);
        xml = '            <cbc:Description>'+art_beschreibung[1]+'</cbc:Description>\r\n';
    } else {xml="";}
    xml_einzelposition = xml_einzelposition.replace('[xml_rechnungspostion_artikelbeschreibung]',xml);
    if ((/\u20AC([0-9\.,]+)/).test(item)){art_preis = item.match(/\u20AC([0-9\.,]+)/);}
    if ((/M[0-9\.,]+%/).test(item)){
        art_mwst_satz = item.match(/M([0-9\.,]+)%/);
    }
    xml =     '                <cbc:Percent>'+art_mwst_satz[1]+'</cbc:Percent>\r\n';
    xml_einzelposition = xml_einzelposition.replace('[xml_mwst_satz]',xml);
    if ((/R[0-9\.,]+%/).test(item)){art_rabatt_satz = item.match(/R([0-9\.,]+)%/);}
    if((/\[(.+)\]/).test(item)){
        art_kommission = item.match(/\[(.+)\]/);
        xml =   '        <cac:OrderLineReference>\r\n'+
                '            <cbc:LineID>'+art_kommission[1]+'</cbc:LineID>\r\n'+
                '        </cac:OrderLineReference>\r\n';
    } else {xml="";}
    xml_einzelposition = xml_einzelposition.replace('[xml_rechnungsposition_kommission]',xml);

    xml_einzelposition = xml_einzelposition.replace("[Rechnungsposition]",zaehler);

    if (mwst_kategorie){
        xml = '                <cbc:ID>'+mwst_kategorie+'</cbc:ID>\r\n';
    } else {xml="";}
    xml_einzelposition = xml_einzelposition.replace('[xml_MWST_Kategorie]',xml);

    if (mwst_kategorie == "G"){
        xml = '                <cbc:TaxExemptionReasonCode>VATEX-EU-G</cbc:TaxExemptionReasonCode>\r\n';
    } else if (mwst_kategorie == "K"){
        xml = '                <cbc:TaxExemptionReasonCode>VATEX-EU-IC</cbc:TaxExemptionReasonCode>\r\n';
    } else {xml="";}
    xml_einzelposition = xml_einzelposition.replaceAll('[xml_MWST_Ausnahme]',xml);



// Summe Nettopreis für diesen Artikel angeben
    art_mwst_satz_aktuell = runden(parseFloat(art_mwst_satz[1].replace(",",".")));
    art_preis_netto = runden(parseFloat(art_anzahl[1]))*runden(betrag_zurechtbiegen(parseFloat(art_preis[1].replace(",",".")),art_mwst_satz_aktuell))/(1+art_mwst_satz_aktuell/100);
    console.log("art_preis_netto: " + art_preis_netto);
    art_preis_netto = runden(art_preis_netto);

    xml = '        <cbc:LineExtensionAmount currencyID="EUR">'+art_preis_netto.toFixed(2)+'</cbc:LineExtensionAmount>\r\n';
    xml_einzelposition = xml_einzelposition.replace('[xml_rechnungsposition_summe_netto_artikel]',xml);
    xml="";

    art_preis_netto_rabatt = runden(parseFloat(art_anzahl[1]))*runden(betrag_zurechtbiegen(parseFloat(art_preis[1].replace(",",".")),art_mwst_satz_aktuell))/(1+ art_mwst_satz_aktuell/100)*(1-runden(parseFloat(art_rabatt_satz[1].replace(",",".")))/100);
    art_preis_netto_rabatt = runden(art_preis_netto_rabatt);
    xml = '            <cbc:PriceAmount currencyID="EUR">'+art_preis_netto_rabatt.toFixed(2)+'</cbc:PriceAmount>\r\n';
    xml_einzelposition = xml_einzelposition.replace('[xml_preis_netto_rabattiert]',xml);
    xml="";

// Mehrwertsteuerbetrag dieses Artikels
    art_mwst = (runden(parseFloat(art_preis_netto)) * runden(parseFloat(art_mwst_satz[1].replace(",",".")))/100);
    art_mwst = runden(art_mwst);
    art_mwst_rabatt = (runden(parseFloat(art_preis_netto_rabatt)) * runden(parseFloat(art_mwst_satz[1].replace(",",".")))/100);
    art_mwst_rabatt = runden(art_mwst_rabatt);

    /* // zunächst herausgenommen, da Rabatt-Ausweisung nicht funktioniert hat
    mwst_gesamt += art_mwst_rabatt;
    netto_gesamt += art_preis_netto_rabatt;
    brutto_gesamt += art_preis_netto_rabatt + art_mwst_rabatt;
*/
// Ersatz, Summen ohne Rabatt gerechnet
    mwst_gesamt += art_mwst;
    netto_gesamt += art_preis_netto;
    brutto_gesamt += art_preis_netto + art_mwst;


    if (mwst_satz_mwst_betrag[art_mwst_satz[1]]){
        mwst_satz_mwst_betrag[art_mwst_satz[1]] += art_mwst_rabatt;
    } else {
        mwst_satz_mwst_betrag[art_mwst_satz[1]] = art_mwst_rabatt;
    }

    if (mwst_satz_netto_betrag[art_mwst_satz[1]]){
        mwst_satz_netto_betrag[art_mwst_satz[1]] += art_preis_netto_rabatt;
    } else {
        mwst_satz_netto_betrag[art_mwst_satz[1]] = art_preis_netto_rabatt;
    }

    xml_positionen += xml_einzelposition;
}


function speichern(){
    blob = new Blob([ $('#xrechnung').val() ], { type: "XML/plain" });

    const blobURL = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobURL;
    a.download = 'R'+$('#Rechnungsnummer').val()+'.xml';
    a.style.display = 'none';
    document.body.append(a);
    a.click();
    setTimeout(() => {
        URL.revokeObjectURL(blobURL);
        a.remove();
    }, 1000);

}


function xml_erstellen(){
    var abw_lieferadresse = "nein";
    betragsaenderung = "nein";
    template = template_original;
    var zaehler=0;
    var xml_positionen = "";
    mwst_satz_mwst_betrag = [];
    mwst_satz_netto_betrag = [];
    mwst_gesamt=0;
    netto_gesamt=0;
    brutto_gesamt=0;
    xml_tax_sub_position = "";
    xml_positionen = "";
    xml_tax_sub = "";

    daten_einlesen();

// Übertragen der Feldinhalte und Stammdaten in die XML-Struktur der Vorlage "template.js"
    if (rechnungsnummer){
        xml = '    <cbc:ID>'+rechnungsnummer+'</cbc:ID>\r\n';} else {xml="";}
    template = template.replace('[xml_Rechnungsnummer]',xml);

    if (rechnungsdatum){
        xml = '    <cbc:IssueDate>'+rechnungsdatum+'</cbc:IssueDate>\r\n';} else {xml="";}
    template = template.replace('[xml_Rechnungsdatum]',xml);

    if (faelligkeitsdatum){
        xml = '    <cbc:DueDate>'+faelligkeitsdatum+'</cbc:DueDate>\r\n';} else {xml="";}
    template = template.replace('[xml_Faelligkeitsdatum]',xml);

    if (rechnungsart){
        xml = '    <cbc:InvoiceTypeCode>'+rechnungsart+'</cbc:InvoiceTypeCode>\r\n';} else {xml="";}
    template = template.replace('[xml_Rechnungsart]',xml);

    if (bemerkung_rechnung){
        xml = '    <cbc:Note>'+bemerkung_rechnung+'</cbc:Note>\r\n';} else {xml="";}
    template = template.replace('[xml_Bemerkung]',xml);
    
    if (waehrung){
        xml = '    <cbc:DocumentCurrencyCode>'+waehrung+'</cbc:DocumentCurrencyCode>\r\n';} else {xml="";}
    template = template.replace('[xml_Waehrung]',xml);

    if (kommission_kunde){
        xml = '    <cbc:BuyerReference>'+kommission_kunde+'</cbc:BuyerReference>\r\n';} else {xml="";}
    template = template.replace('[xml_Kommission_Kunde]',xml);

    if (verkaeufer_data.mail != ""){
        xml = '            <cbc:EndpointID schemeID="EM">'+verkaeufer_data.mail+'</cbc:EndpointID>\r\n';} else {xml="";}
    template = template.replace('[xml_Verkaeufer_mail]',xml);

    if (verkaeufer_data.firmenname != ""){
        xml =   '            <cac:PartyName>\r\n'+
                '                <cbc:Name>'+verkaeufer_data.firmenname+'</cbc:Name>\r\n'+
                '            </cac:PartyName>\r\n';
    } else {xml="";}
    template = template.replace('[xml_Verkaeufer_Name]',xml);

    if (verkaeufer_data.strasse != ""){
        xml =  '                <cbc:StreetName>'+verkaeufer_data.strasse+'</cbc:StreetName>\r\n';} else {xml="";}
    template = template.replace('[xml_Verkaeufer_Strasse]',xml);

    if (verkaeufer_data.strasse_zusatz != ""){
        xml =  '                <cbc:AdditionalStreetName>'+verkaeufer_data.strasse_zusatz+'</cbc:AdditionalStreetName>\r\n';} else {xml="";}
    template = template.replace('[xml_Verkaeufer_Strasse_Zusatz]',xml);

    if (verkaeufer_data.stadt != ""){
        xml =  '                <cbc:CityName>'+verkaeufer_data.stadt+'</cbc:CityName>\r\n';} else {xml="";}
    template = template.replace('[xml_Verkaeufer_Stadt]',xml);

    if (verkaeufer_data.plz != ""){
        xml =  '                <cbc:PostalZone>'+verkaeufer_data.plz+'</cbc:PostalZone>\r\n';} else {xml="";}
    template = template.replace('[xml_Verkaeufer_PLZ]',xml);

    if (verkaeufer_data.land != ""){
        xml =   '                <cac:Country>\r\n'+
                '                    <cbc:IdentificationCode>'+verkaeufer_data.land+'</cbc:IdentificationCode>\r\n'+
                '                </cac:Country>\r\n';
    } else {xml="";}
    template = template.replace('[xml_Verkaeufer_Land]',xml);

    if (verkaeufer_data.umsatzsteuer_id != ""){
        xml =           '                <cbc:CompanyID>'+verkaeufer_data.umsatzsteuer_id+'</cbc:CompanyID>\r\n';
    } else {xml="";}
    template = template.replace('[xml_Verkaeufer_Umsatzsteuer-ID]',xml);

    if (verkaeufer_data.firmenname != ""){
        xml =   '                <cbc:RegistrationName>'+verkaeufer_data.firmenname+'</cbc:RegistrationName>\r\n';} else {xml="";}
    template = template.replace('[xml_Verkaeufer_Name_Register]',xml);

    if (verkaeufer_data.handelsregister_eintrag != ""){
        xml =   '                <cbc:CompanyID>'+verkaeufer_data.handelsregister_eintrag+'</cbc:CompanyID>\r\n';
    } else {xml="";}
    template = template.replace('[xml_HRA-Eintrag]',xml);

    if (verkaeufer_data.zusatz_rechtsform != ""){
        xml =   '                <cbc:CompanyLegalForm>'+verkaeufer_data.zusatz_rechtsform+'</cbc:CompanyLegalForm>\r\n';
    } else {xml="";}
    template = template.replace('[xml_Rechtsform_Zusatz]',xml);

    if (verkaeufer_data.kontakt.name != ""){
        xml =   '                <cbc:Name>'+verkaeufer_data.kontakt.name+'</cbc:Name>\r\n';
    } else {xml="";}
    template = template.replace('[xml_Kontakt_Name]',xml);

    if (verkaeufer_data.kontakt.telefon != ""){
        xml =   '                <cbc:Telephone>'+verkaeufer_data.kontakt.telefon+'</cbc:Telephone>\r\n';
    } else {xml="";}
    template = template.replace('[xml_Kontakt_Telefon]',xml);

    if (verkaeufer_data.kontakt.mail != ""){
        xml =   '                <cbc:ElectronicMail>'+verkaeufer_data.kontakt.mail+'</cbc:ElectronicMail>\r\n';
    } else {xml="";}
    template = template.replace('[xml_Kontakt_Mail]',xml);

    if (kunde_mail){
        xml = '            <cbc:EndpointID schemeID="EM">'+kunde_mail+'</cbc:EndpointID>\r\n';} else {xml="";}
    template = template.replace('[xml_Kunde_mail]',xml);

    if (kundennummer){
        xml =   '            <cac:PartyIdentification>\r\n'+
                '                <cbc:ID>'+kundennummer+'</cbc:ID>\r\n'+
                '            </cac:PartyIdentification>\r\n';
        } else {xml="";}
    template = template.replace('[xml_Kundennummer]',xml);

    if (kunde_strasse){
        xml = '                <cbc:StreetName>'+kunde_strasse+'</cbc:StreetName>\r\n';} else {xml="";}
    template = template.replace('[xml_Kunde_Strasse]',xml);

    if (kunde_strasse_2){
        xml = '                <cbc:AdditionalStreetName>'+kunde_strasse_2+'</cbc:AdditionalStreetName>\r\n';} else {xml="";}
    template = template.replace('[xml_Kunde_Strasse_2]',xml);

    if (kunde_ort){
        xml = '                <cbc:CityName>'+kunde_ort+'</cbc:CityName>\r\n';} else {xml="";}
    template = template.replace('[xml_Kunde_Ort]',xml);

    if (kunde_plz){
        xml = '                <cbc:PostalZone>'+kunde_plz+'</cbc:PostalZone>\r\n';} else {xml="";}
    template = template.replace('[xml_Kunde_PLZ]',xml);
    
    if (kunde_land){
        xml =   '                <cac:Country>\r\n'+
                '                    <cbc:IdentificationCode>'+kunde_land+'</cbc:IdentificationCode>\r\n'+
                '                </cac:Country>\r\n';
        } else {xml="";}
    template = template.replace('[xml_Kunde_Land]',xml);

    if (kunde_steuer_id){
        xml =           '                <cbc:CompanyID>'+kunde_steuer_id+'</cbc:CompanyID>\r\n';
    } else {xml="";}
    template = template.replace('[xml_Kaeufer_Umsatzsteuer-ID]',xml);

    if (kunde_name){
        xml =   '            <cac:PartyLegalEntity>\r\n'+
                '                <cbc:RegistrationName>'+kunde_name+'</cbc:RegistrationName>\r\n'+
                '            </cac:PartyLegalEntity>\r\n';
        } else {xml="";}
    template = template.replace('[xml_Kunde_Name]',xml);

    if (lieferdatum){
        xml = '        <cbc:ActualDeliveryDate>'+lieferdatum+'</cbc:ActualDeliveryDate>\r\n';} else {xml="";}
    template = template.replace('[xml_Lieferdatum]',xml);

    if ($('#Lieferort_Kennung').val()){
        xml = '            <cbc:ID>'+$('#Lieferort_Kennung').val()+'</cbc:ID>\r\n';
        abw_lieferadresse = "ja";
        } else {xml="";}
    template = template.replace('[xml_Lieferort_Kennung]',xml);
    
    if (lieferadresse_strasse_nr){
        xml = '                <cbc:StreetName>'+lieferadresse_strasse_nr+'</cbc:StreetName>\r\n';
        abw_lieferadresse = "ja";
    } else {xml="";}
    template = template.replace('[xml_Lieferadresse_Strasse_Nr]',xml);

    if (lieferadresse_zusatz){
        xml = '                <cbc:AdditionalStreetName>'+lieferadresse_zusatz+'</cbc:AdditionalStreetName>\r\n';
        abw_lieferadresse = "ja";} else {xml="";}
    template = template.replace('[xml_Lieferadresse_Zusatz]',xml);

    if (lieferadresse_ort){
        xml = '                <cbc:CityName>'+lieferadresse_ort+'</cbc:CityName>\r\n';
        abw_lieferadresse = "ja";} else {xml="";}
    template = template.replace('[xml_Lieferadresse_Ort]',xml);

    if (lieferadresse_plz){
        xml = '                <cbc:PostalZone>'+lieferadresse_plz+'</cbc:PostalZone>\r\n'
        abw_lieferadresse = "ja";;} else {xml="";}
    template = template.replace('[xml_Lieferadresse_PLZ]',xml);

    if (lieferadresse_land){
        xml =   '                <cac:Country>\r\n'+
                '                    <cbc:IdentificationCode>'+lieferadresse_land+'</cbc:IdentificationCode>\r\n'+
                '                </cac:Country>\r\n';
                abw_lieferadresse = "ja";
    } else {xml="";}
    template = template.replace('[xml_Lieferadresse_Land]',xml);

    if (empfaenger_name){
        xml =   '        <cac:DeliveryParty>\r\n'+
                '            <cac:PartyName>\r\n'+
                '                <cbc:Name>'+empfaenger_name+'</cbc:Name>\r\n'+
                '            </cac:PartyName>\r\n'+
                '        </cac:DeliveryParty>\r\n';
                abw_lieferadresse = "ja";
    } else {xml="";}
    template = template.replace('[xml_Empfaenger_Name]',xml);


    if (zahlungsweise){
        xml = '        <cbc:PaymentMeansCode>'+zahlungsweise+'</cbc:PaymentMeansCode>\r\n';} else {xml="";}
    template = template.replace('[xml_Zahlungsweise]',xml);

    if (iban){
        xml = '            <cbc:ID>'+iban+'</cbc:ID>\r\n';} else {xml="";}
    template = template.replace('[xml_IBAN]',xml);

    if (zahlungsbedingungen){
        xml = Zahlungsbedingungen_aufbereiten(zahlungsbedingungen);
    } else {xml = "";}
    template = template.replace('[xml_Zahlungsbedingungen]',xml);

    if (mwst_kategorie){
        xml = '                <cbc:ID>'+mwst_kategorie+'</cbc:ID>\r\n';} else {xml="";}
        template = template.replaceAll('[xml_MWST_Kategorie]',xml);


    if (abw_lieferadresse == "ja"){
        template = template.replace('[xml_lieferort_tag_open]','        <cac:DeliveryLocation>\r\n');
        template = template.replace('[xml_lieferort_tag_close]','        </cac:DeliveryLocation>\r\n');
        template = template.replace('[xml_lieferadresse_tag_open]','            <cac:Address>\r\n');
        template = template.replace('[xml_lieferadresse_tag_close]','            </cac:Address>\r\n');
    } else {
        template = template.replace('[xml_lieferort_tag_open]','');
        template = template.replace('[xml_lieferort_tag_close]','');
        template = template.replace('[xml_lieferadresse_tag_open]','');
        template = template.replace('[xml_lieferadresse_tag_close]','');
    }

//Aufbereiten der Einträge aus dem Feld mit den Rechnungspositionen
    positionen_aufbereiten();

    template = template.replace('[xml_positionen]',xml_positionen);
    template = template.replace('[xml_MWST_sub]',xml_tax_sub);

    template = template.replace('[MWST_gesamt]',mwst_gesamt.toFixed(2));
    template = template.replaceAll('[Summe_Netto]',netto_gesamt.toFixed(2));
    template = template.replace('[Summe_Brutto]',brutto_gesamt.toFixed(2));
    template = template.replace('[Zahlbetrag]',brutto_gesamt.toFixed(2));

// Einfügen des XML in das Ergebnisfeld
    $('#xrechnung').val(template);
    if (betragsaenderung == "ja"){
        alert('Es wurden Beträge geändert, um Rundungsfehler zu vermeiden!');
    }
}

function mwst_kategorie_event(){
    console.log("change");
    if ($('input[name="mwst"]:checked').val() == "S" || $('input[name="mwst"]:checked').val() == "G"){$('#Kunde_Steuer_ID').css('background-color','white');}
    if ($('input[name="mwst"]:checked').val() == "K"){$('#Kunde_Steuer_ID').css('background-color','rgb(253, 236, 236)');}
}

function clear(){
    $('input,textarea').val('');
    window.location.href=window.location.href;
}


$(document).ready(function(){
    zahldaten_eintragen();  
    $('#Kunde_Steuer_ID').css('background-color','white');

    $('#bt_erstellen').click(function(){xml_erstellen();});
    $('#bt_speichern').click(function(){speichern();});
    $('#bt_clear').click(function(){clear();});
    $('#bt_testdaten_einsetzen').click(function(){testdaten_einsetzen();});
    $('input[name="mwst"]').on("change",(function(){mwst_kategorie_event();}));
});