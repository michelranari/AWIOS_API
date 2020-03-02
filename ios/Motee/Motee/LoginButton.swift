//
//  LoginButton.swift
//  Motee
//
//  Created by Rayan Bahroun on 27/02/2020.
//  Copyright © 2020 Rayan Bahroun. All rights reserved.
//

import SwiftUI


var users = [
    User(id: 1, pseudo: "Pseudo", mail: "b", mdp: "a"),
    User(id: 2, pseudo: "Pseudo2", mail: "lucas@gmail.com", mdp: "b")
]

struct LoginButton: View {
    @Binding var pseudo : String
    @Binding var mdp : String
    var body: some View {
        VStack{
            if(findConnexion(pseudo: pseudo, mdp: mdp)){
                NavigationLink(destination : Accueil()){
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
        if(u.pseudo == pseudo && u.mdp == mdp){
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
