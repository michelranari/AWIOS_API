//
//  ListeAnswers.swift
//  Motee
//
//  Created by Amjad Menouer on 02/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import Combine
import SwiftUI

struct ListAnswersView: View {
            
    var body: some View {
        VStack{
            //Probleme avec bouton de likes / commentaire / signalement
            AnswerView(comment: "")
            AnswerView(comment: "")
        }
    }
}

struct ListAnswersView_Previews: PreviewProvider {
    static var previews: some View {
        ListAnswersView()
    }
}
