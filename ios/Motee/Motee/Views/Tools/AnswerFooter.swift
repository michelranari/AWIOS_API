//
//  AnswerFooter.swift
//  Motee
//
//  Created by Amjad Menouer on 10/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import SwiftUI

struct AnswerFooter: View {
    @State var isNotHide :Bool = false
    @ObservedObject var utilisateurTest : User = User(pseudo: "root", password: "root", email: "root", city: "ville")
    
    @State var proposTest : Answer = Answer(userR: User(pseudo: "Niska", password: "root", email: "root", city: "ville"), identifierR: 17, contentR: "J'étais dans la rue et on m'a montré du doigt en criant : '...'", anonymousR: false, tagsR: [])
    
    @State var reponseTest : Answer = Answer(userR: User(pseudo: "Niska", password: "root", email: "root", city: "ville"), identifierR: 18, contentR: "Charlie delta commando", anonymousR: true, tagsR: [])
    
    var body: some View {
        VStack{
            VStack{
                HStack {
                    Spacer()
                    AnswerLiked(answer: reponseTest, user: utilisateurTest)
                    Spacer()
                    Report()
                    Spacer()
                }
            }
        }.padding()
    }
}

struct AnswerFooter_Previews: PreviewProvider {
    static var previews: some View {
        AnswerFooter()
    }
}
