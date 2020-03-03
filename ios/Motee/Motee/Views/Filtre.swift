//
//  Filtre.swift
//  Motee
//
//  Created by Rayan Bahroun on 02/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import SwiftUI

struct Filtre: View {
    
    @Binding var filtred : Bool
    var filter1 : String
    var filter2 : String
    var body: some View {
        VStack{
            HStack{
                Text("Filtré par")
                if(self.filtred){
                    Text(filter1)
                }else{
                    Text(filter2)
                }
                Button(action : { self.filtred = !self.filtred}){
                    SymbolGenerator(mySymbol: "line.horizontal.3.decrease.circle", myColor: "gray")
                }
            }
        }
    }
}

struct Filtre_Previews: PreviewProvider {
    @State static var filtre = false
    static var previews: some View {
        Accueil(filtred : filtre)
    }
}
