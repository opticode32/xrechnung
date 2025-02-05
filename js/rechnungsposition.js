var position_original = '    <cac:InvoiceLine>\r\n'+
//Rechnungsposition, eindeutige Bezeichnung innerhalb der Rechnung
'        <cbc:ID>[Rechnungsposition]</cbc:ID>\r\n'+
//Bemerkung zur Rechnungsposition
'[xml_rechnungsposition_bemerkung]' +
//Anzahl (Maßeinheit "Stück")
'[xml_rechnungsposition_anzahl]' +

//Summe netto für diesen Artikel
'[xml_rechnungsposition_summe_netto_artikel]' +
//Kommission/Referenz, vorgegeben durch den Käufer
'[xml_rechnungsposition_kommission]' +
//Informationen zum Artikel
'        <cac:Item>\r\n'+
//Artikelbeschreibung
'[xml_rechnungspostion_artikelbeschreibung]' +
//Artikelname
'[xml_rechnungsposition_artikelname]' +
//Artikelnummer
'[xml_rechnungsposition_artikelnummer]' +

//Umsatzsteuer-Kategorie
//  AE  Steuer wird vom Empfänger erhoben
//  E   Es fallen keine Steuern an
//  S   Standard
//  Z   Waren unterliegen dem Nullsatz
//  G   Umsatzsteuerfreier Export
//  O   Steuerfreie Dienstleistungen
//  K   Innergemeinschaftliche Lieferung steuerfrei
//  L   Kanarische Inseln
//  M   Spanien Ceuta und Melilla 
//  B   Italienisch A-Abweichung
// Interessant: S und G und K
'            <cac:ClassifiedTaxCategory>\r\n'+
'[xml_MWST_Kategorie]'+
//MWST-Satz in Prozent
'[xml_mwst_satz]' +
//'[xml_MWST_Ausnahme]'+                                              !!
'                <cac:TaxScheme>\r\n'+
'                    <cbc:ID>VAT</cbc:ID>\r\n'+
'                </cac:TaxScheme>\r\n'+
'            </cac:ClassifiedTaxCategory>\r\n'+
'        </cac:Item>\r\n'+
'        <cac:Price>\r\n'+
//Preis netto abzgl. Rabatt
'[xml_preis_netto_rabattiert]'+
'        </cac:Price>\r\n'+
'    </cac:InvoiceLine>\r\n';

var tax_sub_original = '        <cac:TaxSubtotal>\r\n'+
//Netto-gesamt
'            <cbc:TaxableAmount currencyID="EUR">[NETTO_gesamt_sub]</cbc:TaxableAmount>\r\n'+
'            <cbc:TaxAmount currencyID="EUR">[MWST_gesamt_sub]</cbc:TaxAmount>\r\n'+
'            <cac:TaxCategory>\r\n'+
//Umsatztsteuer-Kategorie
//  AE  Steuer wird vom Empfänger erhoben
//  E   Es fallen keine Steuern an
//  S   Standard
//  Z   Waren unterliegen dem Nullsatz
//  G   Umsatzsteuerfreier Export
//  O   Steuerfreie Dienstleistungen
//  K   Innergemeinschaftliche Lieferung steuerfrei
//  L   Kanarische Inseln
//  M   Spanien Ceuta und Melilla 
//  B   Italienisch A-Abweichung
// Interessant: S und G und K
'[xml_MWST_Kategorie]' +
//MWST-Satz
'                <cbc:Percent>[MWST_Satz_sub]</cbc:Percent>\r\n'+
'[xml_MWST_Ausnahme]'+
'                <cac:TaxScheme>\r\n'+
'                    <cbc:ID>VAT</cbc:ID>\r\n'+
'                </cac:TaxScheme>\r\n'+
'            </cac:TaxCategory>\r\n'+
'        </cac:TaxSubtotal>\r\n'
;
