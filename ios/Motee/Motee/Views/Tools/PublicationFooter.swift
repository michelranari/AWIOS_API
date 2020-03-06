//
//  PublicationFooter.swift
//  Motee
//
//  Created by Rayan Bahroun on 06/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import SwiftUI

struct PublicationFooter : View {
    @ObservedObject var utilisateurTest : User = User(pseudo: "root", password: "root", email: "root", city: "ville")
    
    @State var proposTest : Answer = Answer(userR: User(pseudo: "Niska", password: "root", email: "root", city: "ville"), identifierR: 17, contentR: "J'étais dans la rue et on m'a montré du doigt en criant : '...'", anonymousR: false, tagsR: [])
    
    @State var reponseTest : Answer = Answer(userR: User(pseudo: "Niska", password: "root", email: "root", city: "ville"), identifierR: 18, contentR: "Charlie delta commando", anonymousR: true, tagsR: [])
    var body: some View {
        HStack {
            PublicationLiked(answer: reponseTest, user: utilisateurTest)
            Spacer()
            Comment()
            Spacer()
            Report()
        }
    }
}

