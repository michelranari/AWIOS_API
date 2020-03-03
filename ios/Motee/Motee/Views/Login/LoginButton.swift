//
//  LoginButton.swift
//  Motee
//
//  Created by Rayan Bahroun on 27/02/2020.
//  Copyright © 2020 Rayan Bahroun. All rights reserved.
//

import SwiftUI


var users = [
    User(pseudo: "Pseudo", password: "a", email: "b", city: ""),
    User(pseudo: "Pseudo", password: "a", email: "b", city: ""),
]

struct LoginButton: View {
    @Binding var pseudo : String
    @Binding var mdp : String
    var body: some View {
        VStack{
            if(findConnexion(pseudo: pseudo, mdp: mdp)){
                NavigationLink(destination : Accueil(filtred :true)){
                    ButtonGenerator(myText: "Se connecter", myColor: "green")
                }
            }
            else{
                ButtonGenerator(myText: "Se connecter", myColor: "red")
            }
        }.padding(.bottom , 10)
            .padding(.top , 30)
    }
}

func findConnexion(pseudo : String, mdp : String) -> Bool {
    for u in users {
        if(u.pseudo == pseudo && u.passwordProperties == mdp){
            return true
        }
    }
    return false
}

struct loginButton_Previews: PreviewProvider {
    @State static var pseudo = "Pseudo"
    @State static var mdp = "mdp"
    static var previews: some View {
        LoginButton(pseudo : $pseudo, mdp : $mdp)
    }
}
