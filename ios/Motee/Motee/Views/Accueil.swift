//
//  Accueil.swift
//  Motee
//
//  Created by Rayan Bahroun on 02/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import SwiftUI

struct Accueil: View {
    @State var filtred : Bool
    var filter1 = "date"
    var filter2 = "like"
    var body: some View {
        NavigationView{
            VStack{
                if(self.filtred){
                    Title(myTitle: "Les derniers propos")
                }else{
                    Title(myTitle: "Les meilleurs propos")
                }
                HStack{
                    NavigationLink(destination : { AddProposition(newProposition: "", newAnswer: "") }() ){
                        SymbolGenerator(mySymbol :"plus.square.fill", myColor: "blue")
                        Text("Ajouter").foregroundColor(.blue).bold()
                    }
                    Spacer()
                    Filtre(filtred: $filtred, filter1: filter1, filter2: filter2)
                }.padding(.horizontal,10)
            }
        }
    }
}

struct Accueil_Previews: PreviewProvider {
    @State static var filtre = false
    static var previews: some View {
        Accueil(filtred: true)
    }
}
