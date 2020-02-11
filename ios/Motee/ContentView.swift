//
//  ContentView.swift
//  Motee
//
//  Created by Amjad Menouer on 10/02/2020.
//  Copyright © 2020 Amjad Menouer. All rights reserved.
//

import SwiftUI

struct ContentView: View {
    @State private var username = ""
    @State private var password = ""
    
    var body: some View {
        VStack{
            Text("MoTee")
                .font(.title)
                .foregroundColor(.gray)
            Text("#BalanceTaPunchline")
                .foregroundColor(.pink)
                .font(.subheadline)
                .bold()
            HStack{
                TextField("Nom d'utilisateur", text: $username)
                Spacer()
                TextField("Mot de passe", text: $password)
            }
        }.padding()
    }
    
    var footer : some View{
        Button(action: /*@START_MENU_TOKEN@*/{}/*@END_MENU_TOKEN@*/) {
            Text(/*@START_MENU_TOKEN@*/"Button"/*@END_MENU_TOKEN@*/)
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
