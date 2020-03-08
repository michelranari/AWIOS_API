//
//  MenuView.swift
//  Motee
//
//  Created by Rayan Bahroun on 07/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import SwiftUI


struct MenuView: View {
    @Binding var currentPage : String
    var body: some View {
        VStack(alignment: .leading) {
            Button(action : {
                self.currentPage = "Accueil"
            }){
                SingleLinkNavBar(title: "Accueil", symbol: "house", topPadding: 30)
            }
            Button(action : {
                self.currentPage = "MyProps"
            }){
                SingleLinkNavBar(title: "Mes propos", symbol: "quote.bubble", topPadding: 30)
            }
            Button(action : {
                self.currentPage = "MyAnswers"
            }){
                SingleLinkNavBar(title: "Mes réponse", symbol: "lightbulb", topPadding: 30)
            }
            Button(action : {
                self.currentPage = "Account"
            }){
                SingleLinkNavBar(title: "Profil", symbol: "person", topPadding: 30)
            }
            Button(action : {
                self.currentPage = "Accueil"
            }){
                SingleLinkNavBar(title: "Settings", symbol: "gear", topPadding: 30)
            }
            Spacer()
        }
        .padding()
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color(red: 32/255, green: 32/255, blue: 32/255))
        .edgesIgnoringSafeArea(.all)
    }
}

struct MenuView_Previews: PreviewProvider {
    @State static var currentPage = "Accueil"
    static var previews: some View {
        MenuView(currentPage : $currentPage)
    }
}
