//
//  Accueil.swift
//  Motee
//
//  Created by Rayan Bahroun on 02/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import SwiftUI

struct Accueil: View {
    @State var filter : String = "all"
    var body: some View {
        NavigationView{
            ScrollView{
                VStack(){
                    HStack{
                        ButtonGenerator(myText: "Mes propos", myColor: "red")
                        ButtonGenerator(myText: "Mes réponses", myColor: "orange")
                    }
                    
                    if(filter.elementsEqual("all")){
                        Title(myTitle: "Tous les propos")
                    }else if filter.elementsEqual("like"){
                        Title(myTitle: "Les meilleurs propos")
                    }else if filter.elementsEqual("dateDesc"){
                        Title(myTitle: "Les plus récents propos")
                    }else if filter.elementsEqual("dateAsc"){
                        Title(myTitle: "Les plus anciens propos")
                    }
                    HStack{
                        NavigationLink(destination : { AddProposition(newProposition: "", newAnswer: "") }() ){
                            SymbolGenerator(mySymbol :"plus.square.fill", myColor: "blue")
                            Text("Ajouter").foregroundColor(.blue).bold()
                        }
                        Filter(filter: $filter)
                    }
                    PropositionView()
                    PropositionView()
                    PropositionView()
                    PropositionView()
                    PropositionView()
                }
                Spacer()
            }
        }
    }
}

struct Accueil_Previews: PreviewProvider {
    static var previews: some View {
        Accueil()
    }
}
