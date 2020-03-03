//
//  Filtre.swift
//  Motee
//
//  Created by Rayan Bahroun on 02/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import SwiftUI

struct Filtre: View {
    
    func getActual() -> String {
        if (filtred){
            return filter1
        }
        return filter2
    }
    @Binding var filtred : Bool
    var filter1 : String
    var filter2 : String
    var body: some View {
        VStack{
            if(self.filtred){
                Title(myTitle: "Les derniers propos")
            }else{
                Title(myTitle: "Les meilleurs propos")
            }
            HStack{
                Text("Filtré par")
                if(self.filtred){
                    Text(filter1)
                }else{
                    Text(filter2)
                }
                Button(action : { self.filtred = !self.filtred}){
                    Image(systemName: "line.horizontal.3.decrease.circle")
                        .font(.largeTitle).foregroundColor(.gray)
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
