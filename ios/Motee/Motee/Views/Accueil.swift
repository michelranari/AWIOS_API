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
    @State var showingModal = false
    var body: some View {
        NavigationView{
            ScrollView{
            VStack{
                VStack(){
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
                            SymbolGenerator(mySymbol :"plus.square.fill", myColor: "pink")
                            Text("Ajouter").foregroundColor(.black).bold()
                        }
                        
                    }
                    
                    //TODO Proposition view ne s'affichent pas !!! (Mais fonctionnent quand même séparément
                    PropositionView()
                    PropositionView()
                    PropositionView()                    
                }
                Spacer()
            }
        }
        }
    }
}

struct Accueil_Previews: PreviewProvider {
    static var previews: some View {
        Accueil()
    }
}
