//
//  Filter.swift
//  Motee
//
//  Created by Rayan Bahroun on 04/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import SwiftUI

struct Filter: View {
    @State var showingModal = false
    @Binding var filter : String
    
    var body: some View {
        ZStack {
            VStack() {
                Button(action: { self.showingModal = true}) {
                    SymbolGenerator(mySymbol: "line.horizontal.3.decrease.circle.fill", myColor: "green")
                }
            }
            if $showingModal.wrappedValue {
                ZStack {
                    Color.black.opacity(0.4) .edgesIgnoringSafeArea(.vertical)
                    VStack(spacing: 20) {
                        Text("Filtre")
                            .bold()
                            .padding(.vertical)
                            .frame(maxWidth: .infinity)
                            .background(Color.green)
                            .foregroundColor(Color.white)
                        Spacer()
                        if !filter.elementsEqual("all"){
                            Button(action: { self.filter = "all"; self.showingModal = false}){
                                Text("Aucun filtre").bold().foregroundColor(Color.black)
                            }
                        }
                        Button(action: { self.filter = "like" ; self.showingModal = false}){
                            Text("Les mieux notés").bold().foregroundColor(Color.black)
                        }
                        Button(action: { self.filter = "dateDesc";self.showingModal = false}){
                            Text("Les plus récents").bold().foregroundColor(Color.black)
                        }
                        Button(action: {self.filter = "dateAsc";self.showingModal = false}){
                            Text("Les plus anciens").bold().foregroundColor(Color.black)
                        }
                        Button(action: {self.showingModal = false}) {
                            Text("Quitter")
                                .bold()
                                .padding(.vertical)
                                .frame(maxWidth: .infinity)
                                .background(lightGreyColor)
                                .foregroundColor(Color.black)
                        }
                    }
                    .frame(width: 300, height: 310)
                    .background(Color.white)
                    .cornerRadius(20).shadow(radius: 20)
                }
            }
        }
    }
}

struct Filter_Previews: PreviewProvider {
    @State static var filtre = "all"
    static var previews: some View {
        Filter(filter: $filtre)
    }
}
