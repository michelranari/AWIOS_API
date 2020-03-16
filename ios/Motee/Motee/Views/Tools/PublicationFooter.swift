//
//  PublicationFooter.swift
//  Motee
//
//  Created by Rayan Bahroun on 06/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import SwiftUI

struct PublicationFooter : View {
    @ObservedObject var utilisateurTest : User = User(from: Decoder)
    
    @State var proposTest : Answer = Answer(from: Decoder)
    
    @State var reponseTest : Answer = Answer(from: Decoder)
    
    @State var isNotHide :Bool = false
    @State var comment = ""
    var body: some View {
        
        VStack{
            VStack{
                HStack {
                    PublicationLiked(answer: reponseTest, user: utilisateurTest)
                    Spacer()
                    
                    Button(action:{
                        self.isNotHide.toggle()
                    }){
                        HStack{
                            Text("Contribuer")
                            Image(systemName: "message.fill")
                        }
                        .padding(7)
                        .foregroundColor(.white)
                        .background(Color.blue).cornerRadius(20)
                    }
                    Spacer()
                    Report()
                }
            }
            if isNotHide {
                HStack{
                    TextField("Commentaire...", text: $comment).cornerRadius(20)
                    Button(action:{
                        // TODO
                        //Envoyer le commentaire
                    }){
                        Image(systemName: "arrowtriangle.right.circle.fill").padding(5)
                    }
                }.padding()
            }
        }.padding()
    }
}

struct PublicationFooter_Previews: PreviewProvider {
    static var previews: some View {
        PublicationFooter()
    }
}
