//
//  ListeReponsesView.swift
//  Motee
//
//  Created by Amjad Menouer on 27/02/2020.
//  Copyright © 2020 Amjad Menouer. All rights reserved.
//
import Combine
import SwiftUI

struct ListeReponsesView: View {
    var proposTest : Propos = Propos(userP: Utilisateur(pseudo: "Niska", password: "root", email: "root", city: "ville"), identifierP: 17, contentP: "Charlie delta commando", anonymousP: false, tagsP: [], titleP: "Titre Test")
    
    @ObservedObject var reponseTest1 : Reponse = Reponse(userR: Utilisateur(pseudo: "Niska", password: "root", email: "root", city: "ville"), identifierR: 18, contentR: "Charlie delta commando", anonymousR: true, tagsR: [])
    @ObservedObject var reponseTest2 : Reponse = Reponse(userR: Utilisateur(pseudo: "Koba", password: "root", email: "root", city: "ville"), identifierR: 19, contentR: "Ahannnnnn", anonymousR: true, tagsR: [])
    
    var answers : [Reponse] = [
        Reponse(userR: Utilisateur(pseudo: "Niska", password: "root", email: "root", city: "ville"), identifierR: 18, contentR: "Charlie delta commando", anonymousR: true, tagsR: []),
        Reponse(userR: Utilisateur(pseudo: "Koba", password: "root", email: "root", city: "ville"), identifierR: 19, contentR: "Ahannnnnn", anonymousR: true, tagsR: [])
    ]
            
    var body: some View {
        VStack{
            Text("Fuck that...")
        }
    }
}

struct ListeReponsesView_Previews: PreviewProvider {
    static var previews: some View {
        ListeReponsesView()
    }
}
